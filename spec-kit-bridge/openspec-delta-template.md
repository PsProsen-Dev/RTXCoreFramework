# 🧬 OpenSpec Delta Template — Brownfield Change Proposal

For **modifications to existing systems**. Greenfield work gets a full spec; brownfield gets a *delta* — reviewers must see exactly what moves, not a rewritten world. Every bucket is mandatory; an empty bucket is written as `_(none)_`, never omitted.

---

## Feature / Change: `<short name>`

**Target system:** `<repo / module / service>`
**Author (agent + human):** `<agent name> + <human>`
**Date:** `<YYYY-MM-DD>`
**Linked spec:** `<path to spec.md or "greenfield — n/a">`

### Why

`<2–4 sentences: the problem this change solves and why now. Mother-tongue first if the session is native-language-led, then English.>`

### Deltas

#### ➕ ADDED
- `<new capability / file / endpoint / behavior>`
- …

#### ✏️ MODIFIED
- `<existing behavior>`: was `<old behavior>` → now `<new behavior>` (reason: `<why>`)
- …

#### ➖ REMOVED
- `<deleted capability / code path>`: justification `<why it is safe to remove; what replaces it, if anything>`
- …

### Impact

| Area | Effect |
|:---|:---|
| Tests | `<which suites must stay green; new tests added>` |
| Security | `<new surface, if any; "none" with reasoning>` |
| Performance / tokens | `<expected delta, measured not guessed>` |
| Rollback | `<how to revert: commit / flag / migration-down>` |

### Evidence (before completion — artifacts, not self-reports)

- [ ] Test run output attached: `<paste or link>`
- [ ] Behavior proof attached: `<terminal transcript / screenshot>`
- [ ] Reviewer sign-off: `<name / "pending">`

---

*Fill every bucket. An unwritten delta is an unreviewed change — and unreviewed changes don't ship.*
