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
OUT_THEORY = SITE_DIR / "theory" / "_generated"
OUT_METHODS = SITE_DIR / "methods" / "_generated"
OUT_GEN = SITE_DIR / "_generated"
DOCS_METHODOLOGY = PROJECT_ROOT / "docs" / "methodology"

THEORY_IDS = [
    "sacrifice-law-v1",
    "koenigsberg-immortal-body-v1",
    "general-theory-political-pathology-v1",
]

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


OUTCOME_GROUPS = {
    "sacrificial-escalation": "Sacrificial Escalation",
    "collapse": "Collapse",
    "hybrid-transitional": "Hybrid / Transitional",
    "restrained-reordering": "Restrained Reordering",
    "stagnation-frozen-pathology": "Stagnation / Frozen Pathology",
    "absorption-transformation": "Absorption / Transformation",
}

GOLD_PAGE_SLUGS = {
    "nazi-germany": "nazi-germany",
    "postwar-germany": "postwar-germany",
    "imperial-japan": "imperial-japan",
    "soviet-union-collapse": "soviet-collapse",
    "united-states-after-vietnam": "united-states-after-vietnam",
}


def render_cases_index(scores: list[dict], counterclaims: list[dict],
                       case_meta: dict) -> str:
    lines: list[str] = []

    scored_cases = {s["caseId"] for s in scores}
    cc_counts = {}
    for cc in counterclaims:
        cc_counts[cc["caseId"]] = cc_counts.get(cc["caseId"], 0) + 1

    all_cases = sorted(case_meta.values(), key=lambda c: c["title"])
    gold = [c for c in all_cases if c.get("goldCase")]
    non_gold = [c for c in all_cases if not c.get("goldCase")]

    lines += [
        f"The workbench tracks **{len(all_cases)} cases** across six outcome categories. "
        f"**{len(gold)} gold cases** have full evidence chains; "
        f"the remaining {len(non_gold)} are structural comparators with counterclaims.",
        "",
        "## Gold Cases",
        "",
        "Full Source → Passage → Claim → Interpretation → Score chains.",
        "",
        "| Case | Outcome | Variables scored | Counterclaims |",
        "|---|---|---|---|",
    ]
    for c in gold:
        cid = c["caseId"]
        slug = GOLD_PAGE_SLUGS.get(cid, cid)
        n_scores = sum(1 for s in scores if s["caseId"] == cid)
        n_cc = cc_counts.get(cid, 0)
        lines.append(
            f"| [{c['title']}]({slug}.qmd) "
            f"| {title_case(c.get('outcome', ''))} "
            f"| {n_scores} "
            f"| {n_cc} |"
        )
    lines.append("")

    # Non-gold cases grouped by outcome
    lines += ["## Structural Comparators", "",
              "Counterclaims recorded; evidence chains not yet built.", ""]

    from collections import defaultdict
    by_outcome: dict[str, list] = defaultdict(list)
    for c in non_gold:
        by_outcome[c.get("outcome", "unknown")].append(c)

    for outcome_id, label in OUTCOME_GROUPS.items():
        group = by_outcome.get(outcome_id, [])
        if not group:
            continue
        lines += [f"### {label}", "",
                  "| Case | Case role | Counterclaims |",
                  "|---|---|---|"]
        for c in sorted(group, key=lambda x: x["title"]):
            cid = c["caseId"]
            n_cc = cc_counts.get(cid, 0)
            lines.append(
                f"| {c['title']} "
                f"| {title_case(c.get('caseSelectionRole', ''))} "
                f"| {n_cc} |"
            )
        lines.append("")

    return "\n".join(lines)


def load_doc(filename: str) -> str:
    path = DOCS_METHODOLOGY / filename
    return path.read_text(encoding="utf-8").strip() if path.exists() else ""


def render_core_definitions() -> str:
    raw = load_doc("core-definitions.md")
    # Strip the H1 title — the page title comes from the .qmd frontmatter
    body = "\n".join(raw.splitlines()[2:]).strip()
    return "\n".join([
        "::: {.callout-warning}",
        "Draft. Definitions are provisional and subject to revision.",
        ":::",
        "",
        body,
        "",
    ])


def render_scoring_rubric() -> str:
    raw = load_doc("scoring-codebook.md")
    body = "\n".join(raw.splitlines()[2:]).strip()
    return "\n".join([
        "::: {.callout-warning}",
        "Draft scoring codebook. All scores and variable definitions are provisional.",
        ":::",
        "",
        body,
        "",
    ])


def render_epistemic_model() -> str:
    model_raw = load_doc("traceable-epistemic-model.md")
    standards_raw = load_doc("evidence-standards.md")
    cc_raw = load_doc("counterevidence.md")

    model_body = "\n".join(model_raw.splitlines()[2:]).strip()
    standards_body = "\n".join(standards_raw.splitlines()[2:]).strip()
    cc_body = "\n".join(cc_raw.splitlines()[2:]).strip()

    review_chain = (
        "`draft` → `source-review` → `evidence-review` → `argument-review` "
        "→ `score-review` → `human-reviewed` → `approved`"
    )

    return "\n".join([
        "::: {.callout-warning}",
        "Draft methods page. Epistemic model and evidence standards are provisional.",
        ":::",
        "",
        model_body,
        "",
        "## Review Status Chain",
        "",
        "Every record in the evidence chain carries a `reviewStatus` field. "
        "The allowed progression is:",
        "",
        review_chain,
        "",
        "A `rejected` status terminates a record without promotion. "
        "AI-generated claims and scores must reach `human-reviewed` or `approved` "
        "before appearing on public-facing pages.",
        "",
        "## Evidence Standards",
        "",
        standards_body,
        "",
        "## Counterclaim Integration",
        "",
        cc_body,
        "",
    ])


def load_theory(theory_id: str, filename: str) -> object:
    path = PROJECT_ROOT / "theories" / theory_id / filename
    if not path.exists():
        return [] if filename.endswith(".json") and filename != "manifest.json" else {}
    text = path.read_text(encoding="utf-8")
    if filename.endswith(".json"):
        return json.loads(text)
    return text.strip()


def render_proposed_law() -> str:
    sl = load_theory("sacrifice-law-v1", "manifest.json")
    gt = load_theory("general-theory-political-pathology-v1", "manifest.json")
    ko = load_theory("koenigsberg-immortal-body-v1", "manifest.json")
    sl_assumptions = load_theory("sacrifice-law-v1", "assumptions.json")
    ko_assumptions = load_theory("koenigsberg-immortal-body-v1", "assumptions.json")

    lines = [
        "::: {.callout-warning}",
        "Draft theory page. All formulations are provisional research scaffolds.",
        ":::",
        "",
        "## The Proposed Law",
        "",
        "> Every sacred political order seeks embodiment. Every embodied order tends toward "
        "self-preservation. Unless continually ordered toward transcendent truth, "
        "self-preservation becomes self-sacralization, and self-sacralization legitimizes "
        "sacrifice under conditions of perceived existential threat.",
        "",
        f"*— {sl['title']}, {sl['version']}*",
        "",
        "## Theoretical Cycle",
        "",
        "```",
        "Symbolic Order",
        "    ↓ seeks",
        "Institutional Embodiment",
        "    ↓ tends toward",
        "Self-Preservation",
        "    ↓ under crisis, becomes",
        "Self-Sacralization",
        "    ↓ legitimizes",
        "Sacrifice  ←→  Outcome",
        "```",
        "",
        "The outcome depends on the order's corrigibility: whether institutional design, "
        "pluralist dissent, anti-sacrificial memory, or constitutional limits can interrupt "
        "the escalation before sacrifice becomes unbounded.",
        "",
        "## Component Theories",
        "",
        f"### {gt['title']}",
        "",
        f"{gt['description']}",
        "",
        next(l for l in load_theory('general-theory-political-pathology-v1', 'theory.md').splitlines() if l.startswith(">")),
        "",
        f"### {ko['title']}",
        "",
        f"{ko['description']}",
        "",
    ]
    for a in ko_assumptions:
        lines.append(f"- {a['text']}")
    lines += [
        "",
        f"### {sl['title']}",
        "",
        f"{sl['description']}",
        "",
    ]
    for a in sl_assumptions:
        lines.append(f"- {a['text']}")
    lines.append("")

    return "\n".join(lines)


def render_theory_versions(scores: list[dict], case_meta: dict) -> str:
    theories = []
    for tid in THEORY_IDS:
        m = load_theory(tid, "manifest.json")
        m["_md"] = load_theory(tid, "theory.md")
        m["_variables"] = load_theory(tid, "variables.json")
        theories.append(m)

    # Which cases use each theory
    by_theory: dict[str, list[str]] = defaultdict(list)
    seen: set[tuple] = set()
    for s in scores:
        key = (s["theoryId"], s["caseId"])
        if key not in seen:
            seen.add(key)
            by_theory[s["theoryId"]].append(s["caseId"])

    lines = [
        "::: {.callout-warning}",
        "Draft. Theories are versioned data objects rather than fixed assumptions.",
        ":::",
        "",
        "The workbench treats theories as versioned data so that competing "
        "frameworks can be applied to the same cases and compared. Each scored "
        "interpretation records which theory it applies.",
        "",
        "| Theory | Version | Status |",
        "|---|---|---|",
    ]
    for t in theories:
        lines.append(f"| {t['title']} | {t['version']} | {t['status']} |")
    lines.append("")

    for t in theories:
        tid = t["theoryId"]
        lines += [f"## {t['title']}", "", t["description"], ""]
        quote_lines = [l for l in t["_md"].splitlines() if l.startswith(">")]
        if quote_lines:
            lines += [quote_lines[0], ""]
        cases_using = by_theory.get(tid, [])
        if cases_using:
            names = ", ".join(title_case(c) for c in cases_using)
            lines += [f"**Gold cases scored under this theory:** {names}", ""]
        scored_vars = {s["variableId"] for s in scores if s["theoryId"] == tid}
        if scored_vars:
            lines += [f"**Variables scored:** {', '.join(title_case(v) for v in sorted(scored_vars))}", ""]
        lines += ["---", ""]

    return "\n".join(lines)


def render_outcomes(case_meta: dict) -> str:
    outcomes = load_theory("general-theory-political-pathology-v1", "outcomes.json")
    by_outcome: dict[str, list] = defaultdict(list)
    for c in case_meta.values():
        by_outcome[c.get("outcome", "")].append(c)

    lines = [
        "::: {.callout-warning}",
        "Draft taxonomy. Outcome assignments are provisional.",
        ":::",
        "",
        "The theory distinguishes six outcome types based on how an embodied "
        "sacred political order responds when its self-preservation drive encounters "
        "crisis pressure.",
        "",
        "| Outcome | Description |",
        "|---|---|",
    ]
    for o in outcomes:
        lines.append(f"| **{o['label']}** | {o['description']} |")
    lines.append("")

    for o in outcomes:
        oid = o["outcomeId"]
        cases = by_outcome.get(oid, [])
        gold = [c for c in cases if c.get("goldCase")]
        comparators = [c for c in cases if not c.get("goldCase")]
        lines += [f"## {o['label']}", "", o["description"], ""]
        if gold:
            names = ", ".join(f"**{c['title']}**" for c in gold)
            lines += [f"*Gold cases:* {names}", ""]
        if comparators:
            names = ", ".join(c["title"] for c in comparators)
            lines += [f"*Comparators:* {names}", ""]
        lines += ["---", ""]

    return "\n".join(lines)


def render_working_paper(scores: list[dict], claims: list[dict],
                         interpretations: list[dict], passages: list[dict],
                         counterclaims: list[dict], case_meta: dict) -> str:
    sl = load_theory("sacrifice-law-v1", "manifest.json")
    gt = load_theory("general-theory-political-pathology-v1", "manifest.json")
    ko = load_theory("koenigsberg-immortal-body-v1", "manifest.json")
    sl_assumptions = load_theory("sacrifice-law-v1", "assumptions.json")
    outcomes = load_theory("general-theory-political-pathology-v1", "outcomes.json")

    proposed_law_quote = (
        "> Every sacred political order seeks embodiment. Every embodied order tends toward "
        "self-preservation. Unless continually ordered toward transcendent truth, "
        "self-preservation becomes self-sacralization, and self-sacralization legitimizes "
        "sacrifice under conditions of perceived existential threat."
    )

    by_case_var: dict[tuple, list] = defaultdict(list)
    for s in scores:
        by_case_var[(s["caseId"], s["variableId"])].append(s["value"])

    primary_interp: dict[str, dict] = {}
    for i in interpretations:
        if i["caseId"] not in primary_interp:
            primary_interp[i["caseId"]] = i

    primary_claim: dict[str, dict] = {}
    for c in claims:
        if c["caseId"] not in primary_claim:
            primary_claim[c["caseId"]] = c

    lines: list[str] = [
        "::: {.callout-warning}",
        "Working paper skeleton. Not for citation as final scholarship. "
        "All evidence chains are provisional and under source review.",
        ":::",
        "",

        # Abstract
        "## Abstract",
        "",
        "Political orders do not merely organize power — they embody symbolic structures "
        "that define collective identity, legitimate sacrifice, and resist correction. "
        "This working paper presents a traceable comparative framework for analyzing "
        "political pathology: the condition in which an embodied sacred political order preserves "
        "itself at the expense of truth, human flourishing, and corrigibility. "
        "The framework introduces a proposed law governing the self-preservation dynamics "
        "of sacred political orders, a six-outcome taxonomy, and a structured evidence-chain model "
        "in which every interpretive claim is traceable to specific passages, sources, and "
        "scoring rationales. Five gold cases — Nazi Germany, Imperial Japan, Postwar Germany, "
        "the Soviet Union, and the United States after Vietnam — are analyzed to test the "
        "framework against historical evidence and competing explanations. "
        "All scores and interpretations are provisional research scaffolds subject to "
        "source verification and intercoder review.",
        "",

        # Introduction
        "## Introduction",
        "",
        "Political orders fail — but the manner and trajectory of failure vary. "
        "Some escalate sacrificial demands until the order collapses under the weight of "
        "its own sacred logic. Others arrest the pathological dynamic through constitutional "
        "design, anti-sacrificial memory, or institutional corrigibility. "
        "Still others stagnate in frozen self-preservation without resolution.",
        "",
        "Existing comparative frameworks attend to institutional structure, elite incentives, "
        "cultural variables, and historical contingency. This project adds a complementary "
        "lens: the symbolic dynamics by which an order's self-preservation drive becomes "
        "self-sacralization, and self-sacralization legitimizes sacrifice. "
        "The central claim is that political pathology is not reducible to bad policy, "
        "failed leadership, or material constraint — it follows a traceable symbolic logic "
        "that can be scored, compared, and theorized.",
        "",
        "The workbench that supports this analysis is designed for corrigibility: "
        "every interpretive step is linked to a source, passage, claim, and scored "
        "interpretation, so that competing evidence can be entered, weighted, and "
        "checked against the theory's predictions. The goal is not to produce a "
        "finished comparative account but a reviewable scaffold.",
        "",

        # Theory
        "## Theory",
        "",
        "### The Proposed Law",
        "",
        proposed_law_quote,
        "",
        f"*— {sl['title']}, {sl['version']}*",
        "",
        "The proposed law identifies a default dynamic in embodied sacred political orders. "
        "It does not claim determinism: the dynamic can be interrupted by corrigibility, "
        "pluralist resistance, constitutional design, or anti-sacrificial memory. "
        "The five gold cases were selected to test where and how interruption occurs.",
        "",
        "### Component Theories",
        "",
        f"**{gt['title']}** ({gt['version']}): {gt['description']}",
        "",
        f"**{ko['title']}** ({ko['version']}): {ko['description']} "
        "The key variable is whether mortal individuals are symbolically linked to an "
        "enduring collective body whose continuation gives meaning to death.",
        "",
        f"**{sl['title']}** ({sl['version']}): {sl['description']} "
        "Key assumptions:",
        "",
    ]
    for a in sl_assumptions:
        lines.append(f"- {a['text']}")
    lines += [
        "",
        "### Outcome Taxonomy",
        "",
        "The theory distinguishes six outcome types based on how an embodied symbolic "
        "order responds when its self-preservation drive encounters crisis pressure:",
        "",
        "| Outcome | Description |",
        "|---|---|",
    ]
    for o in outcomes:
        lines.append(f"| **{o['label']}** | {o['description']} |")
    lines += [
        "",

        # Methods
        "## Methods",
        "",
        "### Evidence Chain Model",
        "",
        "The workbench models every claim as a traceable relationship:",
        "",
        "```",
        "Source → Passage → Claim → Interpretation → Variable Score",
        "             → Case Assessment → Theory Evaluation → Publication Artifact",
        "```",
        "",
        "Each step carries required metadata: source citation, locator, evidence role, "
        "review status, confidence value, uncertainty factors, and definition references. "
        "See [Traceable Epistemic Model](epistemic-model.qmd).",
        "",
        "### Scoring",
        "",
        "Variables are scored 0–5. Scores require `confidence.value`, `confidence.label`, "
        "`confidence.rationale`, `reviewStatus`, `definitionRefs`, and `codebookVersion`. "
        "Current core variables: Symbolic Order Strength, Sacralization, "
        "Collective Immortality, Sacred Enemy, Corrigibility, Pathology. "
        "See [Scoring Rubric](scoring-rubric.qmd).",
        "",
        "### Case Selection",
        "",
        "Five gold cases were selected for full evidence chains:",
        "",
        "| Case | Outcome | Case role |",
        "|---|---|---|",
    ]
    for cid in GOLD_CASES:
        meta = case_meta.get(cid, {})
        lines.append(
            f"| {title_case(cid)} "
            f"| {title_case(meta.get('outcome', ''))} "
            f"| {title_case(meta.get('caseSelectionRole', ''))} |"
        )
    lines += [
        "",
        "Fifteen structural comparators with counterclaims test the outcome taxonomy "
        "against contrasting cases. See [Cases Index](../cases/index.qmd).",
        "",

        # Cases
        "## Case Analyses",
        "",
        "Each subsection presents the primary interpretive claim, mechanism, key passage, "
        "and scores for one gold case, with the primary challenge counterclaim.",
        "",
    ]

    for cid in GOLD_CASES:
        meta = case_meta.get(cid, {})
        interp = primary_interp.get(cid, {})
        claim = primary_claim.get(cid, {})
        case_scores = [s for s in scores if s["caseId"] == cid]
        case_passages = [p for p in passages if p["caseId"] == cid]
        case_cc = [cc for cc in counterclaims if cc["caseId"] == cid]

        lines += [
            f"### {title_case(cid)}",
            "",
            f"**Outcome:** {title_case(meta.get('outcome', ''))}  ",
            f"**Primary mechanism:** {title_case(interp.get('mechanism', '—'))}  ",
            f"**Sacrifice health:** {interp.get('sacrificeHealth', '—')}",
            "",
        ]

        if interp.get("mechanismSummary"):
            lines += [interp["mechanismSummary"], ""]

        if claim:
            conf = claim.get("confidence", {})
            lines += [
                "> " + claim["claim"],
                "",
                f"*Confidence: {conf.get('label', '—')} ({conf.get('value', 0):.2f}) · "
                f"Review: `{claim.get('reviewStatus', 'draft')}`*",
                "",
            ]

        if case_passages:
            p = case_passages[0]
            lines += [
                f"**Key passage** ({p['locator']}, role: {p.get('evidenceRole', '—')}):",
                "",
                f"> {p['text']}",
                "",
            ]

        if case_scores:
            lines += ["**Scores:**", ""]
            for s in case_scores:
                conf = s.get("confidence", {})
                lines.append(
                    f"- {title_case(s['variableId'])}: "
                    f"{score_bar(s['value'])} {s['value']}/5 "
                    f"({conf.get('label', '—')})"
                )
            lines.append("")

        if case_cc:
            cc = case_cc[0]
            lines += [
                "::: {.callout-note appearance=\"minimal\"}",
                f"**Challenge ({cc.get('effect', '—')}):** {cc['claim']}",
                "",
                f"*{cc.get('rationale', '')}*",
                ":::",
                "",
            ]

        lines += ["---", ""]

    # Discussion
    all_vars = sorted({s["variableId"] for s in scores})
    var_headers = " | ".join(title_case(v) for v in all_vars)
    var_seps = " | ".join("---" for _ in all_vars)

    lines += [
        "## Discussion",
        "",
        "### Cross-Case Comparison",
        "",
        "The five gold cases span four outcome categories and two sacrifice health "
        "assessments (pathological, healthy, ambiguous), enabling preliminary "
        "cross-case inference.",
        "",
        f"| Case | Outcome | {var_headers} | Mechanism | Sacrifice health |",
        f"|---| --- | {var_seps} | --- | --- |",
    ]
    for cid in GOLD_CASES:
        meta = case_meta.get(cid, {})
        interp = primary_interp.get(cid, {})
        cells = []
        for v in all_vars:
            vals = by_case_var.get((cid, v), [])
            cells.append(
                f"{score_bar(round(sum(vals)/len(vals)))} {sum(vals)/len(vals):.0f}/5"
                if vals else "—"
            )
        lines.append(
            f"| {title_case(cid)} "
            f"| {title_case(meta.get('outcome', ''))} "
            f"| {' | '.join(cells)} "
            f"| {title_case(interp.get('mechanism', '—'))} "
            f"| {interp.get('sacrificeHealth', '—')} |"
        )
    lines += [
        "",
        "### Theoretical Implications",
        "",
        "The Nazi Germany and Imperial Japan cases share the `collective-immortality-to-sacrifice` "
        "mechanism, suggesting that when the sacred political order represents the collective body "
        "as divinely or racially eternal, mortal sacrifice becomes not only tolerable but "
        "demanded. Postwar Germany's `constitutional-containment` outcome directly "
        "addresses this dynamic: the Grundgesetz embeds inviolable human dignity "
        "precisely to block the sacralization of the collective at the expense of persons.",
        "",
        "The Soviet Union case isolates the role of corrigibility failure: the order's "
        "inability to acknowledge systemic error until legitimacy collapse was irreversible "
        "suggests that pathology is sustained not by sacrificial escalation alone but by "
        "the structural suppression of corrective feedback.",
        "",
        "The United States after Vietnam presents an ambiguous case — memory-driven "
        "restraint functioned as a partial corrigibility mechanism through the War Powers "
        "Resolution, but the workbench's current chain data does not resolve whether "
        "this represents genuine corrigibility or deferred escalation. "
        "This ambiguity is flagged as a research priority.",
        "",

        # Conclusion
        "## Conclusion and Limitations",
        "",
        "This working paper presents a scholarly scaffold, not a finished argument. "
        "The following limitations apply:",
        "",
        "- **Source verification pending.** All five gold cases use passages at `draft` "
        "or `source-review` status. No claims have reached `approved` status.",
        "- **Single-passage claims.** Several cases rely on a single primary passage, "
        "which the evidence standard treats as provisional unless explicitly reviewed "
        "with confidence rationale.",
        "- **Theory versioning.** All scores are applied under "
        f"`{sl['theoryId']}` version `{sl['version']}`. Theory revision will require "
        "re-scoring.",
        "- **Comparators.** The 15 structural comparators have counterclaims but no "
        "full evidence chains. Cross-case claims drawing on comparators are not yet "
        "supportable at the level the framework requires.",
        "- **Intercoder reliability.** No intercoder reliability checks have been "
        "completed. See `docs/methodology/intercoder-reliability.md`.",
        "",
        "The workbench is designed so that these limitations are addressable incrementally: "
        "each source verification, additional passage, or intercoder check improves the "
        "evidence chain without requiring a complete reanalysis. "
        "The framework is complete enough to be reviewed; it is not complete enough to cite.",
        "",
    ]

    return "\n".join(lines)


DISPLAY_VARS = ["sacred-political-order-strength", "corrigibility"]


def render_comparison_table(scores: list[dict], interpretations: list[dict],
                            case_meta: dict) -> str:
    """All-20-case cross-case comparison table, grouped by outcome cluster."""
    lines: list[str] = []

    lines += [
        "::: {.callout-warning}",
        "Draft cross-case comparison. All scores are provisional and under source review.",
        ":::",
        "",
        "All 20 cases scored across key theory variables, grouped by outcome cluster. "
        "Score bars: ■ = scored point, □ = unscored point (scale 0–5). "
        "Ranges (e.g. 4–5/5) indicate multiple interpretations of the same variable. "
        "— indicates no score recorded for that variable.",
        "",
    ]

    by_case_var: dict[tuple, list] = defaultdict(list)
    for s in scores:
        by_case_var[(s["caseId"], s["variableId"])].append(s["value"])

    primary_interp: dict[str, dict] = {}
    for i in interpretations:
        if i["caseId"] not in primary_interp:
            primary_interp[i["caseId"]] = i

    var_headers = " | ".join(title_case(v) for v in DISPLAY_VARS)
    var_seps = " | ".join("---" for _ in DISPLAY_VARS)

    for outcome_id, outcome_label in OUTCOME_GROUPS.items():
        group = sorted(
            [c for c in case_meta.values() if c.get("outcome") == outcome_id],
            key=lambda c: c["title"],
        )
        if not group:
            continue

        lines += [
            f"### {outcome_label}",
            "",
            f"| Case | {var_headers} | Mechanism | Sacrifice health | Boundedness |",
            f"|---| {var_seps} |---|---|---|",
        ]

        for c in group:
            cid = c["caseId"]
            interp = primary_interp.get(cid, {})
            slug = GOLD_PAGE_SLUGS.get(cid)
            label = f"[{c['title']}](../cases/{slug}.qmd)" if slug else c["title"]

            cells = []
            for v in DISPLAY_VARS:
                vals = by_case_var.get((cid, v), [])
                if not vals:
                    cells.append("—")
                elif len(vals) == 1:
                    cells.append(f"{score_bar(vals[0])} {vals[0]}/5")
                else:
                    avg = sum(vals) / len(vals)
                    lo, hi = min(vals), max(vals)
                    cells.append(f"{score_bar(round(avg))} {lo}–{hi}/5")

            mechanism = title_case(interp.get("mechanism", "—"))
            health = interp.get("sacrificeHealth", "—")
            boundedness = interp.get("sacrificeBoundedness", "—")
            lines.append(
                f"| {label} | {' | '.join(cells)} | {mechanism} | {health} | {boundedness} |"
            )
        lines.append("")

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
    import subprocess
    subprocess.run(
        ["node", "src-js/cli/generate-indexes.js"],
        cwd=PROJECT_ROOT, check=True, capture_output=True,
    )
    subprocess.run(
        ["node", "src-js/cli/generate-site-data.js"],
        cwd=PROJECT_ROOT, check=True, capture_output=True,
    )

    OUT.mkdir(parents=True, exist_ok=True)
    OUT_OUTPUTS.mkdir(parents=True, exist_ok=True)
    OUT_GEN.mkdir(parents=True, exist_ok=True)

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

    # Methods pages
    OUT_METHODS.mkdir(parents=True, exist_ok=True)
    for fname, content in [
        ("core-definitions.md", render_core_definitions()),
        ("scoring-rubric.md", render_scoring_rubric()),
        ("epistemic-model.md", render_epistemic_model()),
    ]:
        p = OUT_METHODS / fname
        p.write_text(content, encoding="utf-8")
        print(f"  [pre-render] Wrote {p.relative_to(PROJECT_ROOT)}")

    # Theory pages
    OUT_THEORY.mkdir(parents=True, exist_ok=True)
    for fname, content in [
        ("proposed-law.md", render_proposed_law()),
        ("theory-versions.md", render_theory_versions(scores, case_meta)),
        ("outcomes.md", render_outcomes(case_meta)),
    ]:
        p = OUT_THEORY / fname
        p.write_text(content, encoding="utf-8")
        print(f"  [pre-render] Wrote {p.relative_to(PROJECT_ROOT)}")

    # Cases index
    cases_index = render_cases_index(scores, counterclaims, case_meta)
    index_path = SITE_DIR / "cases" / "_generated-index.md"
    index_path.write_text(cases_index, encoding="utf-8")
    print(f"  [pre-render] Wrote {index_path.relative_to(PROJECT_ROOT)}")

    # Working paper
    working_paper = render_working_paper(
        scores, claims, interpretations, passages, counterclaims, case_meta
    )
    wp_path = OUT_OUTPUTS / "working-paper.md"
    wp_path.write_text(working_paper, encoding="utf-8")
    print(f"  [pre-render] Wrote {wp_path.relative_to(PROJECT_ROOT)}")

    # Cross-case comparison table (all 20 cases)
    comp_table = render_comparison_table(scores, interpretations, case_meta)
    comp_table_path = OUT_GEN / "comparison-table.md"
    comp_table_path.write_text(comp_table, encoding="utf-8")
    print(f"  [pre-render] Wrote {comp_table_path.relative_to(PROJECT_ROOT)}")


if __name__ == "__main__":
    main()
