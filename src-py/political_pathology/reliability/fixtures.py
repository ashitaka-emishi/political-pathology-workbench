from __future__ import annotations

import json
from pathlib import Path

from .metrics import summarize_reliability


ROOT = Path(__file__).resolve().parents[3]
FIXTURE_DIR = ROOT / "tests" / "fixtures" / "reliability"


def run_fixture(path: Path) -> tuple[bool, dict, dict]:
    fixture = json.loads(path.read_text(encoding="utf-8"))
    summary = summarize_reliability(
        fixture["coderScores"],
        fixture.get("codingRoundId"),
    ).to_dict()
    expected = fixture["expected"]
    return summary == expected, summary, expected


def main() -> None:
    failures = 0
    for path in sorted(FIXTURE_DIR.glob("*.json")):
        fixture_data = json.loads(path.read_text(encoding="utf-8"))
        if "expected" not in fixture_data:
            continue
        passed, summary, expected = run_fixture(path)
        if passed:
            print(f"PASS {path.name}")
        else:
            failures += 1
            print(f"FAIL {path.name}: expected {expected}, got {summary}")
    if failures:
        raise SystemExit(1)
    print("All reliability fixtures validated as expected.")


if __name__ == "__main__":
    main()
