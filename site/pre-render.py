#!/usr/bin/env python3
"""Pre-render: generate markdown chain fragments for gold case pages."""
from __future__ import annotations

import json
from pathlib import Path

SITE_DIR = Path(__file__).parent
PROJECT_ROOT = SITE_DIR.parent
GEN = PROJECT_ROOT / "data" / "generated"
OUT = SITE_DIR / "cases" / "_chains"

GOLD_CASES = [
    "nazi-germany",
    "postwar-germany",
    "imperial-japan",
    "soviet-union-collapse",
    "united-states-after-vietnam",
]


def load(name: str) -> list[dict]:
    path = GEN / f"all-{name}.json"
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else []


def title_case(s: str) -> str:
    return s.replace("-", " ").title() if s else ""


def score_bar(v: int) -> str:
    return "■" * v + "□" * (5 - v)


def render_case(case_id: str, meta: dict, passages: list, claims: list,
                interpretations: list, scores: list, counterclaims: list) -> str:
    lines: list[str] = []

    lines += [
        "::: {.callout-warning}",
        "Draft gold case. All evidence is provisional and under source review.",
        "Public availability does not imply scholarly finality.",
        ":::",
        "",
        f"| | |",
        f"|---|---|",
        f"| **Outcome** | {title_case(meta.get('outcome', ''))} |",
        f"| **Case role** | {title_case(meta.get('caseSelectionRole', ''))} |",
        "",
    ]

    # Scores
    lines += ["## Scores", ""]
    if scores:
        lines += ["| Variable | Value | Confidence | Review status |",
                  "|---|---|---|---|"]
        for s in scores:
            conf = s.get("confidence", {})
            lines.append(
                f"| {title_case(s['variableId'])} "
                f"| {score_bar(s['value'])} {s['value']}/5 "
                f"| {conf.get('label', '—')} ({conf.get('value', 0):.2f}) "
                f"| `{s['reviewStatus']}` |"
            )
        lines.append("")
    else:
        lines += ["*No scores recorded.*", ""]

    # Passages
    lines += ["## Passages", ""]
    for p in passages:
        lines += [
            f"> {p['text']}",
            "",
            f"**Locator:** {p['locator']}  ",
            f"**Role:** {p.get('evidenceRole', '—')} · "
            f"Source: `{p['sourceId']}`  ",
            f"**Review status:** `{p.get('reviewStatus', 'draft')}`",
            "",
            "---",
            "",
        ]
    if not passages:
        lines += ["*No passages recorded.*", ""]

    # Claims
    lines += ["## Claim", ""]
    for c in claims:
        conf = c.get("confidence", {})
        uf = conf.get("uncertaintyFactors", [])
        lines += [
            c["claim"],
            "",
            f"**Confidence:** {conf.get('label', '—')} ({conf.get('value', 0):.2f})  ",
            f"**Review status:** `{c.get('reviewStatus', 'draft')}`  ",
        ]
        if uf:
            lines.append(f"**Uncertainty factors:** {', '.join(uf)}")
        lines.append("")
    if not claims:
        lines += ["*No claims recorded.*", ""]

    # Interpretations
    lines += ["## Interpretations", ""]
    for i in interpretations:
        lines += [
            f"**Variable:** {title_case(i['variableId'])}  ",
            f"**Mechanism:** {title_case(i.get('mechanism', '—'))}  ",
            f"**Review status:** `{i.get('reviewStatus', 'draft')}`",
            "",
        ]
        if i.get("mechanismSummary"):
            lines += [f"*{i['mechanismSummary']}*", ""]
        if i.get("interpretation"):
            lines += [i["interpretation"], ""]
        lines += ["---", ""]
    if not interpretations:
        lines += ["*No interpretations recorded.*", ""]

    # Counterclaims
    lines += ["## Counterclaims", ""]
    for cc in counterclaims:
        lines += [
            f"::: {{.callout-note appearance=\"minimal\"}}",
            f"**Effect:** {cc.get('effect', '—')}",
            "",
            cc["claim"],
            "",
            f"**Rationale:** {cc.get('rationale', '')}",
            ":::",
            "",
        ]
    if not counterclaims:
        lines += ["*No counterclaims recorded.*", ""]

    return "\n".join(lines)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    summary_path = SITE_DIR / "data" / "workbench-summary.json"
    summary = json.loads(summary_path.read_text(encoding="utf-8")) if summary_path.exists() else {"cases": []}
    case_meta = {c["caseId"]: c for c in summary.get("cases", [])}

    passages = load("passages")
    claims = load("claims")
    interpretations = load("interpretations")
    scores = load("scores")
    counterclaims = load("counterclaims")

    for case_id in GOLD_CASES:
        content = render_case(
            case_id,
            case_meta.get(case_id, {}),
            [p for p in passages if p["caseId"] == case_id],
            [c for c in claims if c["caseId"] == case_id],
            [i for i in interpretations if i["caseId"] == case_id],
            [s for s in scores if s["caseId"] == case_id],
            [cc for cc in counterclaims if cc["caseId"] == case_id],
        )
        out_path = OUT / f"{case_id}.md"
        out_path.write_text(content, encoding="utf-8")
        print(f"  [pre-render] Wrote {out_path.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
