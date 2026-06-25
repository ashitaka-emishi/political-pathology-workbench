from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
SCORES_PATH = ROOT / "data" / "generated" / "all-scores.json"
OUTPUT_PATH = ROOT / "site" / "outputs" / "scoring-summary.json"


def load_scores() -> list[dict]:
    if not SCORES_PATH.exists():
        return []
    return json.loads(SCORES_PATH.read_text(encoding="utf-8"))


def summarize_scores(scores: list[dict]) -> dict:
    by_case: dict[str, list[float]] = defaultdict(list)
    by_variable: dict[str, list[float]] = defaultdict(list)

    for score in scores:
        value = float(score["value"])
        by_case[score["caseId"]].append(value)
        by_variable[score["variableId"]].append(value)

    def average(values: list[float]) -> float:
        return round(sum(values) / len(values), 2) if values else 0.0

    return {
        "scoreCount": len(scores),
        "caseAverages": {case_id: average(values) for case_id, values in sorted(by_case.items())},
        "variableAverages": {variable_id: average(values) for variable_id, values in sorted(by_variable.items())},
    }


def main() -> None:
    scores = load_scores()
    summary = summarize_scores(scores)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)} with {summary['scoreCount']} score(s).")


if __name__ == "__main__":
    main()
