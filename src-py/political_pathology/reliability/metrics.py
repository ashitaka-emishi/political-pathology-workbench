from __future__ import annotations

from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from itertools import combinations
from typing import Iterable


@dataclass(frozen=True)
class ReliabilitySummary:
    coding_round_id: str
    status: str
    codebook_version: str
    unit_variable_count: int
    pair_count: int
    known_pair_count: int
    exact_agreement: float | None
    mean_absolute_difference: float | None
    krippendorff_alpha_ordinal: float | None
    expected_assignment_count: int
    completed_assignment_count: int
    missing_assignment_count: int
    missingness_rate: float
    missing_assignments: list[dict]
    by_variable: dict[str, dict]

    def to_dict(self) -> dict:
        return asdict(self)


def _round(value: float) -> float:
    return round(value, 4)


def _pairs(records: Iterable[dict]) -> list[tuple[dict, dict]]:
    return list(combinations(sorted(records, key=lambda r: r["coderId"]), 2))


def _known_value_pairs(pairs: Iterable[tuple[dict, dict]]) -> list[tuple[dict, dict]]:
    return [
        (left, right)
        for left, right in pairs
        if left.get("value") is not None and right.get("value") is not None
    ]


def _distance(left: float, right: float) -> float:
    return (float(left) - float(right)) ** 2


def exact_agreement(pairs: Iterable[tuple[dict, dict]]) -> float | None:
    pair_list = _known_value_pairs(pairs)
    if not pair_list:
        return None
    matches = sum(1 for left, right in pair_list if left["value"] == right["value"])
    return _round(matches / len(pair_list))


def mean_absolute_difference(pairs: Iterable[tuple[dict, dict]]) -> float | None:
    pair_list = _known_value_pairs(pairs)
    if not pair_list:
        return None
    total = sum(abs(float(left["value"]) - float(right["value"])) for left, right in pair_list)
    return _round(total / len(pair_list))


def krippendorff_alpha_ordinal(groups: Iterable[list[dict]]) -> float | None:
    observed_distances: list[float] = []
    values: list[float] = []
    for records in groups:
        known_values = [float(record["value"]) for record in records if record.get("value") is not None]
        values.extend(known_values)
        if len(known_values) >= 2:
            observed_distances.extend(_distance(left, right) for left, right in combinations(known_values, 2))

    if not observed_distances or len(values) < 2:
        return None
    expected_distances = [_distance(left, right) for left, right in combinations(values, 2)]
    expected = sum(expected_distances) / len(expected_distances)
    if expected == 0:
        return 1.0
    observed = sum(observed_distances) / len(observed_distances)
    return _round(1 - (observed / expected))


def _active_scores(raw_scores: list[dict]) -> list[dict]:
    superseded_ids = {score["supersedesCoderScoreId"] for score in raw_scores if score.get("supersedesCoderScoreId")}
    active = [score for score in raw_scores if score.get("coderScoreId") not in superseded_ids]
    duplicate_keys = [
        key for key, count in Counter(
            (score["codingRoundId"], score["coderId"], score["unitId"], score["variableId"])
            for score in active
        ).items()
        if count > 1
    ]
    if duplicate_keys:
        formatted = ", ".join("/".join(key) for key in duplicate_keys)
        raise ValueError(f"duplicate active coder submissions: {formatted}")
    return active


def _assignment_key(record: dict) -> tuple[str, str, str]:
    return record["coderId"], record["unitId"], record["variableId"]


def _missing_assignments(expected_assignments: list[dict], completed_scores: list[dict]) -> list[dict]:
    completed = {_assignment_key(score) for score in completed_scores}
    return [
        assignment for assignment in expected_assignments
        if _assignment_key(assignment) not in completed
    ]


def _summarize_groups(coding_round_id: str, codebook_version: str, grouped: dict[tuple[str, str], list[dict]], expected_assignments: list[dict], completed_scores: list[dict]) -> ReliabilitySummary:
    all_pairs: list[tuple[dict, dict]] = []
    for records in grouped.values():
        all_pairs.extend(_pairs(records))
    known_pairs = _known_value_pairs(all_pairs)
    missing = _missing_assignments(expected_assignments, completed_scores)
    expected_count = len(expected_assignments)
    completed_count = len(expected_assignments) - len(missing) if expected_assignments else len(completed_scores)
    alpha = krippendorff_alpha_ordinal(grouped.values())
    status = "ok" if known_pairs else "insufficient-data"
    return ReliabilitySummary(
        coding_round_id=coding_round_id,
        status=status,
        codebook_version=codebook_version,
        unit_variable_count=len(grouped),
        pair_count=len(all_pairs),
        known_pair_count=len(known_pairs),
        exact_agreement=exact_agreement(all_pairs),
        mean_absolute_difference=mean_absolute_difference(all_pairs),
        krippendorff_alpha_ordinal=alpha,
        expected_assignment_count=expected_count,
        completed_assignment_count=completed_count,
        missing_assignment_count=len(missing),
        missingness_rate=_round(len(missing) / expected_count) if expected_count else 0.0,
        missing_assignments=missing,
        by_variable={},
    )


def summarize_reliability(
    coder_scores: list[dict],
    coding_round_id: str | None = None,
    expected_assignments: list[dict] | None = None,
) -> ReliabilitySummary:
    raw_scores = [
        score for score in coder_scores
        if score.get("adjudicationState") == "raw-submitted"
        and (coding_round_id is None or score.get("codingRoundId") == coding_round_id)
    ]
    round_id = coding_round_id or (raw_scores[0]["codingRoundId"] if raw_scores else "")
    if not raw_scores:
        return ReliabilitySummary(round_id, "insufficient-data", "", 0, 0, 0, None, None, None, 0, 0, 0, 0.0, [], {})

    round_ids = {score["codingRoundId"] for score in raw_scores}
    if coding_round_id is None and len(round_ids) != 1:
        raise ValueError("summarize_reliability requires one coding round at a time")
    round_id = coding_round_id or next(iter(round_ids))

    active_scores = _active_scores(raw_scores)
    codebook_versions = {score.get("codebookVersion", "") for score in active_scores}
    if len(codebook_versions) != 1:
        raise ValueError(f"incompatible codebook versions in {round_id}: {sorted(codebook_versions)}")
    codebook_version = next(iter(codebook_versions))

    expected = expected_assignments or []
    grouped: dict[tuple[str, str], list[dict]] = defaultdict(list)
    by_variable_records: dict[str, list[dict]] = defaultdict(list)
    for score in active_scores:
        grouped[(score["unitId"], score["variableId"])].append(score)
        by_variable_records[score["variableId"]].append(score)

    summary = _summarize_groups(round_id, codebook_version, grouped, expected, active_scores).to_dict()
    by_variable = {}
    for variable_id, records in sorted(by_variable_records.items()):
        variable_grouped: dict[tuple[str, str], list[dict]] = defaultdict(list)
        for record in records:
            variable_grouped[(record["unitId"], record["variableId"])].append(record)
        variable_expected = [assignment for assignment in expected if assignment["variableId"] == variable_id]
        variable_summary = _summarize_groups(round_id, codebook_version, variable_grouped, variable_expected, records).to_dict()
        by_variable[variable_id] = {
            key: variable_summary[key]
            for key in [
                "status",
                "unit_variable_count",
                "pair_count",
                "known_pair_count",
                "exact_agreement",
                "mean_absolute_difference",
                "krippendorff_alpha_ordinal",
                "expected_assignment_count",
                "completed_assignment_count",
                "missing_assignment_count",
                "missingness_rate",
                "missing_assignments",
            ]
        }
    summary["by_variable"] = by_variable
    return ReliabilitySummary(**summary)
