# 🔄 Spec-Kit Bridge — Conversion Layer

**Precision Protocol specs ↔ GitHub Spec-Kit constitution format.**

RTX's Precision Protocol and GitHub Spec-Kit (`/specify → /plan → /tasks → /implement`) describe the same discipline — spec before code, plan before implementation — in different dialects. This document is the Rosetta Stone: lossless conversion in both directions, with the 70/30 native-language blend and the evidence gates surviving the trip.

---

## 1. Concept Mapping

| Precision Protocol | Spec-Kit | What it is |
|:---|:---|:---|
| 📐 Structured Output Template (spec: tables, Mermaid, checklists) | `specs/<feature>/spec.md` | The feature specification — *what* to build, *why*, acceptance criteria |
| 📐 Architecture decisions inside the spec | `specs/<feature>/plan.md` | The technical plan — *how* to build it, stack, structure, risks |
| 🗣️ Native-tongue assertions | Acceptance criteria in `spec.md` + test tasks in `tasks.md` | Assertions bilingualized: Hinglish intent → English test code |
| ✅ Review checklists + evidence rule | Per-task acceptance criteria + verification steps | Every task carries its own definition of done *with artifacts* |
| 🧬 OpenSpec delta (brownfield) | `specs/<feature>/` delta section | `ADDED / MODIFIED / REMOVED` buckets (see `openspec-delta-template.md`) |

---

## 2. Direction 1 — RTX → Spec-Kit (`/specify /plan /tasks /implement`)

Take an RTX structured spec and emit Spec-Kit artifacts:

1. **`/specify` ← RTX spec.** The Markdown tables become the spec's sections (Overview, Requirements, Non-goals); the Mermaid diagrams become the architecture figures; the explicit checklists become acceptance criteria. **Native-tongue assertions are preserved as bilingual criteria** — each criterion carries the mother-tongue statement *and* its English test form:
   ```markdown
   - [ ] AC-3: "Agar user authenticated nahi hai, toh 401 aana chahiye — redirect nahi"
         → test: expect(response.status).toBe(401)
   ```

2. **`/plan` ← RTX architecture decisions.** Decisions buried in the RTX spec's reasoning get promoted to `plan.md` with alternatives-considered and trade-offs stated.
3. **`/tasks` ← RTX checklist decomposition.** Each checklist item becomes a task with an owner (agent role), dependencies, and its own evidence gate: *task is done only when its artifact exists* (test output, screenshot, log).
4. **`/implement` ← RTX execution.** Runs the task list; the RTX review checklist becomes the per-task verification step. Evidence-before-completion is enforced at every task boundary, not just at the end.

## 3. Direction 2 — Spec-Kit → RTX

Take Spec-Kit artifacts and reconstitute an RTX Precision Protocol spec:

1. **`spec.md` + `plan.md` → 📐 RTX structured spec.** Re-render as Markdown tables + Mermaid + checklists in the RTX house format.
2. **Acceptance criteria → 🗣️ Native-tongue assertions.** Each English criterion gets its mother-tongue twin articulated first (70/30 blend), so the native-language review layer is restored rather than lost in translation.
3. **Task verification steps → ✅ RTX review checklists.** Collated into the zero-tolerance checklist (Logic, Security & Edge Cases, Format, RTX Compliance), with the evidence rule attached: artifacts, not self-reports.

---

## 4. Non-Negotiables (both directions)

- **The 70/30 blend survives conversion.** A converted artifact that is pure English has lost information — the mother-tongue assertions are load-bearing, not decorative.
- **Evidence gates survive conversion.** If a task's definition of done doesn't name its artifact, the conversion is incomplete.
- **Brownfield uses deltas.** Modifications to existing systems go through [`openspec-delta-template.md`](openspec-delta-template.md) — never a rewritten full spec that hides what changed.

---

*Part of Operation RTX Recon (R7). Spec-Kit: github.com/github/spec-kit. OpenSpec delta convention: ADDED / MODIFIED / REMOVED.*
