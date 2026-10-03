# 🧠 RTX Memory Layer Spec

> Agents that forget are expensive. Agents that remember *everything* are
> worse — token budget khatam, context rot, purani galtiyaan repeat.
> Memory ko infrastructure banao: layered, bounded, retrievable — aur
> transcript replay ko kabhi memory mat samjho. ⚡

**Status:** spec v1.0 (maps to Boot Protocol + Universal Output Protocol)
**Pluggable backends:** [mem0](https://github.com/mem0ai/mem0), [Graphiti](https://github.com/getzep/graphiti) — the spec below is backend-agnostic.

## The four layers 🗂️

```
┌─────────────────────────────────────────────────────┐
│ L1  SESSION CONTEXT      always loaded, ephemeral   │  ← current task, files, chat
├─────────────────────────────────────────────────────┤
│ L2  ALWAYS-ON PROFILE    always loaded, BOUNDED     │  ← CLAUDE.md / MEMORY.md rules
├─────────────────────────────────────────────────────┤
│ L3  EPISODIC MEMORY      retrieved on demand        │  ← past sessions, facts, prefs
├─────────────────────────────────────────────────────┤
│ L4  WORKFLOW MEMORY      retrieved on trigger       │  ← lessons learned, compound eng.
└─────────────────────────────────────────────────────┘
        shared multi-agent memory sits UNDER all four
```

### L1 — Session context (ephemeral)

The working set: current mission, open files, this chat, tool outputs.
**Rule:** Dies with the session. Never persisted raw — only *distilled*
into L3/L4 at session end (see § Write protocol).

### L2 — Always-on profile (bounded)

The `CLAUDE.md` = always-on rules pattern. Small, hand-curated, loaded into
every session:

- Identity: agent name, user addressal, language blend (70% romanized + 30% English)
- Non-negotiables: output protocol, anti-inline rule, safety lines
- **Hard cap: ≤ 100 lines / ~2k tokens.** If it grows past that, demote items to L3.

`MEMORY.md` conventions: one curated file per durable fact domain
(user facts, preferences, commitments). Append-only edits, dated entries,
never a transcript dump.

### L3 — Episodic memory (retrieved)

Past-session facts: user preferences, decisions, people, project state.
Retrieved by semantic search **only when relevant** — the agent queries, the
backend returns top-k snippets with source links, nothing more.

- Store: `fact + source session + date + confidence`.
- Supersede, don't accumulate: a corrected fact replaces the old one
  (old claim marked superseded, kept for audit).
- **Anti-pattern:** never replay full transcripts into context. A 50k-token
  transcript "for context" is a budget fire — retrieve the 5 facts that matter.

### L4 — Workflow memory ("lessons learned" — compound engineering)

After **every delivery**, the agent writes a short lesson entry:

```markdown
## 2026-10-03 — <what happened>
**Lesson:** <one line, reusable>
**Trigger:** <when this applies again>
```

Examples: *"Zoho DNS: the Host '@' field must be typed, not left as
placeholder"* / *"Whisper too heavy on this VM — use Vosk for voice notes"*.

This is **compound engineering**: every delivery makes the next one cheaper.
Workflow memory is retrieved by trigger-matching at session start
("you're doing DNS work — 2 lessons apply").

### Shared multi-agent memory (the floor)

When initializer → coder → evaluator (or any agent team) share a run:

- **Single source of truth:** the run's `PROGRESS.md` / `state.json`
  (see `agent-harness/`). Agents read it; they don't each keep a private copy.
- **Write discipline:** append-only logs, dated entries, no silent rewrites.
- **Summaries cross the boundary, never raw context:** the coder hands the
  evaluator a summary + evidence pointers, not its full transcript.
  (Matches the recon finding: fan-out for read-only breadth, single-threaded writes.)

## Backend mapping 🔌

| Spec concept | mem0 | Graphiti |
|--------------|------|----------|
| L2 always-on profile | `MEMORY.md` file (not the vector store — keep it hand-curated) | same |
| L3 episodic | mem0 memory (user/agent/run scopes) | episodic nodes + entities |
| L4 workflow lessons | mem0 with `lesson` metadata + trigger tags | community/cluster summaries |
| Shared run state | files on disk (`agent-harness/` contract) | files on disk — graph is for recall, not coordination |

Backend is pluggable: swap mem0 ↔ Graphiti ↔ plain markdown files without
changing the agent's contract. **Start with files.** Graduate to a backend
when retrieval beats grep.

## Write protocol (session end) ✍️

Before a session closes, the agent distills — never dumps:

1. New durable facts → L3 (one line each, with date).
2. New reusable lessons → L4 (lesson + trigger).
3. Corrections → supersede in L3 (old claim marked, not deleted).
4. Everything else → discarded. Forgetting is a feature.

## Anti-patterns ⛔

| Anti-pattern | Why it fails |
|--------------|--------------|
| **Raw transcript replay** | Token cost explodes; old context poisons new decisions |
| Unbounded L2 profile | "Always loaded" becomes "always bloated" — cap it |
| Private per-agent memory in a team | Agents re-derive what the run file already knows → drift |
| Lessons without triggers | A lesson nobody retrieves is a diary, not memory |
| Storing secrets in memory | Credentials, tokens, OTPs — never in L2/L3/L4 |

## Mapping to RTX 📖

| Spec piece | RTX section |
|------------|-------------|
| L2 always-on profile | Initialization & Boot Protocol (compiled personalization), Ecosystem Templates (`CLAUDE.md`) |
| L3/L4 distillation | Universal Output Protocol (Summarize step), Task Execution Workflow |
| Shared run state | agent-harness/ state contract |
| Lessons learned | Core Philosophy — continuous self-assessment (T pillar) |
