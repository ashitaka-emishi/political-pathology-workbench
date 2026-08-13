from __future__ import annotations

import json
from pathlib import Path

from .summary import classify_analytical_eligibility


ROOT = Path(__file__).resolve().parents[3]
FIXTURES_PATH = ROOT / "tests" / "fixtures" / "analytical-eligibility" / "fixtures.json"


def main() -> None:
    fixtures = json.loads(FIXTURES_PATH.read_text(encoding="utf-8"))
    failures = 0
    for fixture in fixtures:
        verdict = classify_analytical_eligibility(
            fixture["score"],
            fixture.get("interpretations", []),
            fixture.get("claims", []),
            fixture.get("promotionRegistry", []),
            fixture.get("case"),
        )
        if verdict == fixture["expected"]:
            print(f"PASS {fixture['name']}")
        else:
            failures += 1
            print(f"FAIL {fixture['name']}: expected {fixture['expected']}, got {verdict}")

    if failures:
        raise SystemExit(f"{failures} Python analytical-eligibility fixture(s) failed.")
    print("All Python analytical-eligibility fixtures validated as expected.")


if __name__ == "__main__":
    main()
