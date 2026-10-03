# 🤖 agent-harness/ — The RTX Ralph Loop

> **The X pillar, made executable.** Philosophy says *"Never stop until the
> goal is achieved"* — this directory is the machinery that actually does it:
> a fixed mission prompt, an initializer, a coder, and a separate evaluator,
> looping over an on-disk state contract until the build is done or the caps
> hit. Boss, ye sirf autonomy ki baat nahi — ye autonomy ka engine hai. ⚙️⚡

## The three roles 🔱

```
  ┌─────────────┐
  │ INITIALIZER │  one-shot: ./init.sh <run-name>
  │  (you)      │  scaffolds run-<name>/{PROGRESS.md, FEATURES.md, state.json, eval/}
  └──────┬──────┘
         ▼
  ┌─────────────┐   ┌──────────────┐   ┌─────────────┐
  │    CODER    │──▶│  EVALUATOR   │──▶│    CODER    │──▶ ...
  │ 1 feature / │   │ tests LIVE   │   │ next        │
  │ session     │   │ app, verdict │   │ feature     │
  └─────────────┘   └──────────────┘   └─────────────┘
         each session starts with PROMPT.md + PROGRESS.md
```

1. **Initializer** — runs `init.sh` once. Fills in FEATURES.md. Sets the
   iteration caps in `state.json`. Human (or orchestrator) job, takes minutes.
2. **Coder** — autonomous agent session. Reads PROGRESS.md, builds the ONE
   topmost ⬜ TODO feature, updates all three state files, stops.
   Mission prompt: **PROMPT.md** (fixed — never improvised).
3. **Evaluator** — a *separate* agent/session from the coder. Tests the LIVE
   app against the feature's assertions, writes `eval/eval-<NN>.md`, and
   issues ✅ PASS / 🔁 RETRY / ❌ FAIL. Kills self-grading bias: the coder's
   claims are evidence input, never the grade.

## Quick start 🚀

```bash
# 1. Initialize the run
./init.sh my-app

# 2. Edit the mission + features
nano run-my-app/FEATURES.md     # list features, one per row
nano run-my-app/PROGRESS.md     # write the mission brief

# 3. Start the loop: hand PROMPT.md to your coding agent
#    (paste PROMPT.md at the top of a fresh session, point it at run-my-app/)

# 4. After each coder session, run the evaluator (separate session):
#    "You are the EVALUATOR (agent-harness/EVALUATOR.md). Test run-my-app."

# 5. Repeat coder → evaluator until all features ✅ + final eval PASS,
#    or an iteration cap stops the loop.
```

## The state contract 📁

| File | Who writes | Who reads | Purpose |
|------|-----------|-----------|---------|
| `PROGRESS.md` | coder (append-only log + status) | coder, evaluator, human | Living ground truth of the run |
| `FEATURES.md` | initializer (list), coder (ticks) | coder, evaluator | One-feature-per-row checklist |
| `state.json` | coder, evaluator | tooling, orchestrator | Machine-readable: iteration, phase, caps, eval history |
| `eval/eval-<NN>.md` | evaluator only | coder (on RETRY), human | Verdicts with real evidence |

## Worked mini-example 🧪

Mission: a CLI todo app (`todo` command, JSON storage).

```bash
./init.sh todo-cli
# ✅ RTX run initialized: ./run-todo-cli
```

`run-todo-cli/FEATURES.md`:

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 1 | `todo add "task"` writes to todos.json | ✅ DONE | eval-01 PASS |
| 2 | `todo list` prints numbered tasks | ✅ DONE | eval-02 PASS |
| 3 | `todo done <n>` marks complete | 🔨 IN PROGRESS | coder session 3 |
| 4 | `todo rm <n>` deletes a task | ⬜ TODO | |

**Session 3 (coder):** reads PROGRESS.md → sees features 1–2 DONE, picks
feature 3 → implements `todo done` → runs tests → updates FEATURES.md (✅),
appends session log to PROGRESS.md → stops.

**Evaluator session:** boots the real CLI, runs `todo add` / `todo done 1` /
`todo list` against a scratch file → writes `eval/eval-03.md`:

> **Verdict:** 🔁 RETRY — `todo done 99` on an empty list prints `undefined`
> instead of an error. Evidence: `$ todo done 99` → `undefined`.

**Session 4 (coder):** reads eval-03, fixes only the reported bug, re-runs
tests, updates state. **Session 5 (evaluator):** PASS → feature 4 unlocked.

The loop ends when feature 4 passes eval, or `max_iterations: 10` is hit —
whichever comes first. No vibes, no drift, no "trust me it works". ⚡

## Design rules (non-negotiable) 🛡️

- **One feature per session.** Bounded blast radius, reviewable diffs.
- **The evaluator never trusts PROGRESS.md.** It tests the live app.
- **Caps are hard.** 10 iterations/run, 3 retries/feature, 2 consecutive
  failures → human review. See EVALUATOR.md.
- **State files are append-mostly.** History is the memory; never rewrite it.
- **Artifacts over assertions.** Terminal output, test results, screenshots —
  never the agent's self-report.

## Mapping to RTX 📖

| Harness piece | RTX section |
|---------------|-------------|
| PROMPT.md | ULTRON Agent (autonomous starter), Precision Protocol |
| init.sh / PROGRESS-template.md | Initialization & Boot Protocol |
| EVALUATOR.md | Universal Output Protocol (evidence rule), X pillar |
| The loop itself | Task Execution Workflow: Explore → Plan → Execute → Verify → Summarize |
