from __future__ import annotations

from collections import defaultdict
from dataclasses import asdict, dataclass
from itertools import combinations
from typing import Iterable


@dataclass(frozen=True)
class ReliabilitySummary:
    coding_round_id: str
    unit_variable_count: int
    pair_count: int
    exact_agreement: float
    mean_absolute_difference: float

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


def exact_agreement(pairs: Iterable[tuple[dict, dict]]) -> float:
    pair_list = _known_value_pairs(pairs)
    if not pair_list:
        return 0.0
    matches = sum(1 for left, right in pair_list if left["value"] == right["value"])
    return _round(matches / len(pair_list))


def mean_absolute_difference(pairs: Iterable[tuple[dict, dict]]) -> float:
    pair_list = _known_value_pairs(pairs)
    if not pair_list:
        return 0.0
    total = sum(abs(float(left["value"]) - float(right["value"])) for left, right in pair_list)
    return _round(total / len(pair_list))


def summarize_reliability(coder_scores: list[dict], coding_round_id: str | None = None) -> ReliabilitySummary:
    raw_scores = [
        score for score in coder_scores
        if score.get("adjudicationState") == "raw-submitted"
        and (coding_round_id is None or score.get("codingRoundId") == coding_round_id)
    ]
    if not raw_scores:
        round_id = coding_round_id or ""
        return ReliabilitySummary(round_id, 0, 0, 0.0, 0.0)

    round_ids = {score["codingRoundId"] for score in raw_scores}
    if coding_round_id is None and len(round_ids) != 1:
        raise ValueError("summarize_reliability requires one coding round at a time")
    round_id = coding_round_id or next(iter(round_ids))

    grouped: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for score in raw_scores:
        grouped[(score["unitId"], score["variableId"])].append(score)

    all_pairs: list[tuple[dict, dict]] = []
    for records in grouped.values():
        all_pairs.extend(_pairs(records))

    return ReliabilitySummary(
        coding_round_id=round_id,
        unit_variable_count=len(grouped),
        pair_count=len(all_pairs),
        exact_agreement=exact_agreement(all_pairs),
        mean_absolute_difference=mean_absolute_difference(all_pairs),
    )
