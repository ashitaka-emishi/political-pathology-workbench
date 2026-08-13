from __future__ import annotations

import json
from pathlib import Path

from .adjudication import validate_adjudication_lineage


ROOT = Path(__file__).resolve().parents[3]
FIXTURE_DIR = ROOT / "tests" / "fixtures" / "adjudication-lineage"


def main() -> None:
    failures = 0
    for path in sorted(FIXTURE_DIR.glob("*.json")):
        fixture = json.loads(path.read_text(encoding="utf-8"))
        errors = validate_adjudication_lineage(
            fixture.get("coderScores", []),
            fixture.get("adjudications", []),
            fixture.get("finalScores", []),
        )
        expected_error = fixture.get("expectedError")
        passed = not errors if fixture.get("valid") else any(expected_error in error for error in errors)
        if passed:
            print(f"PASS {path.name}")
        else:
            failures += 1
            print(f"FAIL {path.name}: expected {expected_error or 'no errors'}, got {errors}")
    if failures:
        raise SystemExit(1)
    print("All adjudication-lineage fixtures validated as expected.")


if __name__ == "__main__":
    main()
