#!/usr/bin/env python3
"""Pre-render: generate markdown fragments for gold case pages and dashboard."""
from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

SITE_DIR = Path(__file__).parent
PROJECT_ROOT = SITE_DIR.parent
GEN = PROJECT_ROOT / "data" / "generated"
OUT = SITE_DIR / "cases" / "_chains"
OUT_OUTPUTS = SITE_DIR / "outputs" / "_generated"

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


def render_dashboard(scores: list[dict], case_meta: dict) -> str:
    lines: list[str] = []

    lines += [
        "::: {.callout-warning}",
        "Draft scoring dashboard. All scores are provisional and under source review.",
        "Public availability does not imply scholarly finality.",
        ":::",
        "",
        f"**{len(scores)} scores** recorded across "
        f"**{len({s['caseId'] for s in scores})} gold cases** and "
        f"**{len({s['variableId'] for s in scores})} variables.**",
        "",
    ]

    # Variable averages
    by_var: dict[str, list] = defaultdict(list)
    for s in scores:
        by_var[s["variableId"]].append(s["value"])

    lines += ["## Variable Averages", "",
              "| Variable | Average | N | Score bar |",
              "|---|---|---|---|"]
    for var_id, vals in sorted(by_var.items(), key=lambda kv: -sum(kv[1]) / len(kv[1])):
        avg = sum(vals) / len(vals)
        bar = score_bar(round(avg))
        lines.append(f"| {title_case(var_id)} | {avg:.2f} | {len(vals)} | {bar} |")
    lines.append("")

    # Cross-case breakdown
    all_vars = sorted({s["variableId"] for s in scores})
    gold_cases = [c for c in GOLD_CASES if any(s["caseId"] == c for s in scores)]

    by_case_var: dict[tuple, list] = defaultdict(list)
    for s in scores:
        by_case_var[(s["caseId"], s["variableId"])].append(s["value"])

    var_headers = " | ".join(title_case(v) for v in all_vars)
    var_seps = " | ".join("---" for _ in all_vars)
    lines += [
        "## Scores by Case", "",
        f"| Case | {var_headers} | Outcome |",
        f"|---| {var_seps} |---|",
    ]
    for case_id in gold_cases:
        meta = case_meta.get(case_id, {})
        cells = []
        for v in all_vars:
            vals = by_case_var.get((case_id, v), [])
            if vals:
                avg = sum(vals) / len(vals)
                cells.append(f"{score_bar(round(avg))} {avg:.0f}/5")
            else:
                cells.append("—")
        outcome = title_case(meta.get("outcome", ""))
        lines.append(f"| {title_case(case_id)} | {' | '.join(cells)} | {outcome} |")
    lines.append("")

    # Per-case detail
    lines += ["## Per-Case Score Detail", ""]
    for case_id in gold_cases:
        meta = case_meta.get(case_id, {})
        case_scores = [s for s in scores if s["caseId"] == case_id]
        lines += [f"### {title_case(case_id)}", "",
                  f"**Outcome:** {title_case(meta.get('outcome', ''))}  ",
                  f"**Case role:** {title_case(meta.get('caseSelectionRole', ''))}",
                  "",
                  "| Variable | Value | Confidence | Uncertainty factors | Review status |",
                  "|---|---|---|---|---|"]
        for s in case_scores:
            conf = s.get("confidence", {})
            uf = ", ".join(conf.get("uncertaintyFactors", [])) or "—"
            lines.append(
                f"| {title_case(s['variableId'])} "
                f"| {score_bar(s['value'])} {s['value']}/5 "
                f"| {conf.get('label', '—')} ({conf.get('value', 0):.2f}) "
                f"| {uf} "
                f"| `{s['reviewStatus']}` |"
            )
        lines.append("")

    return "\n".join(lines)


def render_comparison(scores: list[dict], interpretations: list[dict],
                      counterclaims: list[dict], case_meta: dict) -> str:
    lines: list[str] = []

    lines += [
        "::: {.callout-warning}",
        "Draft case comparison. All evidence is provisional and under source review.",
        "Public availability does not imply scholarly finality.",
        ":::",
        "",
        "Comparison of the five gold cases across outcome, scored variables, "
        "primary mechanism, and challenge counterclaims.",
        "",
    ]

    # Summary comparison table
    all_vars = sorted({s["variableId"] for s in scores})
    by_case_var: dict[tuple, list] = defaultdict(list)
    for s in scores:
        by_case_var[(s["caseId"], s["variableId"])].append(s["value"])

    primary_interp: dict[str, dict] = {}
    for i in interpretations:
        if i["caseId"] not in primary_interp:
            primary_interp[i["caseId"]] = i

    var_headers = " | ".join(title_case(v) for v in all_vars)
    var_seps = " | ".join("---" for _ in all_vars)
    lines += [
        "## Summary",
        "",
        f"| Case | Outcome | {var_headers} | Primary mechanism | Sacrifice health |",
        f"|---| --- | {var_seps} | --- | --- |",
    ]
    for case_id in GOLD_CASES:
        meta = case_meta.get(case_id, {})
        cells = []
        for v in all_vars:
            vals = by_case_var.get((case_id, v), [])
            cells.append(f"{score_bar(round(sum(vals)/len(vals)))} {sum(vals)/len(vals):.0f}/5" if vals else "—")
        interp = primary_interp.get(case_id, {})
        mechanism = title_case(interp.get("mechanism", "—"))
        health = interp.get("sacrificeHealth", "—")
        lines.append(
            f"| [{title_case(case_id)}](../{case_id_to_slug(case_id)}) "
            f"| {title_case(meta.get('outcome', ''))} "
            f"| {' | '.join(cells)} "
            f"| {mechanism} "
            f"| {health} |"
        )
    lines.append("")

    # Per-case narrative rows
    lines += ["## Case Profiles", ""]
    for case_id in GOLD_CASES:
        meta = case_meta.get(case_id, {})
        interp = primary_interp.get(case_id, {})
        case_scores = [s for s in scores if s["caseId"] == case_id]
        case_cc = [cc for cc in counterclaims if cc["caseId"] == case_id]

        lines += [
            f"### {title_case(case_id)}",
            "",
            f"| | |",
            f"|---|---|",
            f"| **Outcome** | {title_case(meta.get('outcome', ''))} |",
            f"| **Case role** | {title_case(meta.get('caseSelectionRole', ''))} |",
            f"| **Primary mechanism** | {title_case(interp.get('mechanism', '—'))} |",
            f"| **Sacrifice health** | {interp.get('sacrificeHealth', '—')} |",
            f"| **Boundedness** | {interp.get('sacrificeBoundedness', '—')} |",
        ]
        if interp.get("sacrificeForm"):
            lines.append(f"| **Sacrifice forms** | {', '.join(interp['sacrificeForm'])} |")
        lines.append("")

        if interp.get("mechanismSummary"):
            lines += [f"*{interp['mechanismSummary']}*", ""]

        if interp.get("alternativeMechanisms"):
            alts = ", ".join(title_case(m) for m in interp["alternativeMechanisms"])
            lines += [f"**Alternative mechanisms considered:** {alts}", ""]

        if case_scores:
            lines += ["**Scores:**", ""]
            for s in case_scores:
                conf = s.get("confidence", {})
                lines.append(
                    f"- {title_case(s['variableId'])}: "
                    f"{score_bar(s['value'])} {s['value']}/5 "
                    f"({conf.get('label', '—')}, {conf.get('value', 0):.2f})"
                )
            lines.append("")

        if case_cc:
            lines += ["**Key challenge:**", ""]
            cc = case_cc[0]
            lines += [
                f"::: {{.callout-note appearance=\"minimal\"}}",
                f"**Effect:** {cc.get('effect', '—')}",
                "",
                cc["claim"],
                ":::",
                "",
            ]

        lines += ["---", ""]

    return "\n".join(lines)


def case_id_to_slug(case_id: str) -> str:
    slugs = {
        "nazi-germany": "cases/nazi-germany",
        "postwar-germany": "cases/postwar-germany",
        "imperial-japan": "cases/imperial-japan",
        "soviet-union-collapse": "cases/soviet-collapse",
        "united-states-after-vietnam": "cases/united-states-after-vietnam",
    }
    return slugs.get(case_id, f"cases/{case_id}")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    OUT_OUTPUTS.mkdir(parents=True, exist_ok=True)

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

    # Dashboard
    dashboard = render_dashboard(scores, case_meta)
    dash_path = OUT_OUTPUTS / "scoring-dashboard.md"
    dash_path.write_text(dashboard, encoding="utf-8")
    print(f"  [pre-render] Wrote {dash_path.relative_to(PROJECT_ROOT)}")

    # Case comparison
    comparison = render_comparison(scores, interpretations, counterclaims, case_meta)
    comp_path = OUT_OUTPUTS / "case-comparison.md"
    comp_path.write_text(comparison, encoding="utf-8")
    print(f"  [pre-render] Wrote {comp_path.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
