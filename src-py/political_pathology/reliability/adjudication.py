from __future__ import annotations


ALLOWED_DISAGREEMENT_CATEGORIES = {
    "evidence-selection",
    "construct-boundary",
    "temporal-scope",
    "source-interpretation",
    "scale-boundary",
    "missing-evidence",
    "codebook-ambiguity",
    "other",
}


def _context(record: dict) -> tuple:
    return (
        record.get("codingRoundId"),
        record.get("unitId"),
        record.get("caseId"),
        record.get("theoryId"),
        record.get("variableId"),
        record.get("codebookVersion"),
    )


def _numeric_values(records: list[dict]) -> list[float]:
    return [float(record["value"]) for record in records if record.get("value") is not None]


def validate_adjudication_lineage(coder_scores: list[dict], adjudications: list[dict], final_scores: list[dict] | None = None) -> list[str]:
    errors: list[str] = []
    coder_scores_by_id = {score.get("coderScoreId"): score for score in coder_scores}
    adjudications_by_id: dict[str, dict] = {}

    for adjudication in adjudications:
        adjudication_id = adjudication.get("adjudicationId", "<unknown>")
        if adjudication_id in adjudications_by_id:
            errors.append(f"{adjudication_id}: duplicate adjudicationId")
        adjudications_by_id[adjudication_id] = adjudication

        input_ids = adjudication.get("inputCoderScoreIds", [])
        if len(input_ids) != len(set(input_ids)):
            errors.append(f"{adjudication_id}: inputCoderScoreIds must be unique")
        inputs = []
        for input_id in input_ids:
            score = coder_scores_by_id.get(input_id)
            if not score:
                errors.append(f"{adjudication_id}: missing coder score {input_id}")
                continue
            if score.get("adjudicationState") != "raw-submitted":
                errors.append(f"{adjudication_id}: input {input_id} must be raw-submitted")
            inputs.append(score)

        if inputs:
            contexts = {_context(score) for score in inputs}
            if len(contexts) != 1:
                errors.append(f"{adjudication_id}: input coder scores must share coding round, unit, case, theory, variable, and codebook")
            input_context = next(iter(contexts))
            if adjudication.get("codingRoundId") != input_context[0]:
                errors.append(f"{adjudication_id}: codingRoundId does not match inputs")
            if adjudication.get("unitId") != input_context[1]:
                errors.append(f"{adjudication_id}: unitId does not match inputs")
            if adjudication.get("variableId") != input_context[4]:
                errors.append(f"{adjudication_id}: variableId does not match inputs")

            values = _numeric_values(inputs)
            expected_min = min(values) if values else None
            expected_max = max(values) if values else None
            if adjudication.get("inputRange", {}).get("min") != expected_min or adjudication.get("inputRange", {}).get("max") != expected_max:
                errors.append(f"{adjudication_id}: inputRange does not match raw coder values")
            expected_disagreement = None if expected_min is None or expected_max is None else round(expected_max - expected_min, 4)
            if adjudication.get("absoluteDisagreement") != expected_disagreement:
                errors.append(f"{adjudication_id}: absoluteDisagreement does not match input range")
            if adjudication.get("adjudicatorId") in {score.get("coderId") for score in inputs} and not adjudication.get("selfAdjudicationCaveat"):
                errors.append(f"{adjudication_id}: self-adjudication requires selfAdjudicationCaveat")

        categories = adjudication.get("disagreementCategories", [])
        if not categories:
            errors.append(f"{adjudication_id}: disagreementCategories must not be empty")
        for category in categories:
            if category not in ALLOWED_DISAGREEMENT_CATEGORIES:
                errors.append(f"{adjudication_id}: unsupported disagreement category {category}")

    for score in final_scores or []:
        if score.get("scoreOrigin") not in {"adjudicated", "final"}:
            continue
        score_id = score.get("scoreId", "<unknown>")
        adjudication_id = score.get("adjudicationId")
        adjudication = adjudications_by_id.get(adjudication_id)
        if not adjudication:
            errors.append(f"{score_id}: adjudicated/final score must reference exactly one valid adjudication")
            continue
        if score.get("variableId") != adjudication.get("variableId"):
            errors.append(f"{score_id}: variableId does not match adjudication {adjudication_id}")
        if score.get("value") != adjudication.get("adjudicatedValue"):
            errors.append(f"{score_id}: value does not match adjudicatedValue in {adjudication_id}")
        if score.get("valueSemantics") != adjudication.get("valueSemantics"):
            errors.append(f"{score_id}: valueSemantics does not match adjudication {adjudication_id}")

    return errors
