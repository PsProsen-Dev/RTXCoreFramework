# EVALUATOR.md — The Third Role ⚖️

> The evaluator is a **separate agent/session** from the coder.
> Same repo, same PROGRESS.md — different hands, different eyes.
> Its job is not to grade effort. Its job is to **test the live app and kill
> self-grading bias**.

## When the evaluator runs 🔁

After the coder finishes an iteration (or after the final feature), the
evaluator gets a fresh session with the same PROMPT discipline — but a
different mission: **prove the app works, or prove it doesn't.**

```
1. READ <run-dir>/PROGRESS.md (context) — but TRUST NOTHING in it.
2. START the app yourself (docker / npm / python / whatever FEATURES.md says).
3. TEST the newly-built feature against its native-tongue assertions —
   the real UI, the real API, the real binary. Click it. Curl it. Break it.
4. RUN the full test suite. Note every failure with terminal evidence.
5. WRITE eval/eval-<NN>.md with: verdict, evidence, reproduction steps.
6. UPDATE state.json: append to `evaluations`, set phase to
   "evaluating" (→ coder gets another shot) or "done".
```

## The checklist ✅

| # | Check | How | Pass bar |
|---|-------|-----|----------|
| 1 | **It runs** | Fresh clone / fresh shell, follow the documented start command | Zero manual patching needed |
| 2 | **Feature works live** | Exercise the actual feature, not the demo path | Matches FEATURES.md acceptance criteria |
| 3 | **No regressions** | Full test suite green | Previously-✅ features still work |
| 4 | **Precision compliance** | Read the diff of the iteration | No placeholders, no TODOs, no hardcoded secrets |
| 5 | **State honesty** | Diff PROGRESS.md claims vs what you observed | Every claim backed by evidence, or flagged |

## Verdicts 🎯

- **✅ PASS** — ship it. Next coder iteration takes the next feature.
- **🔁 RETRY** — real bugs found. Send back to coder with the eval report
  attached. Coder fixes ONLY what the report lists.
- **❌ FAIL** — iteration cap hit, or the feature is unfixable in this
  design. Record in FEATURES.md + PROGRESS.md; the loop stops for humans.

## Hard iteration caps ⛔

| Limit | Value | Why |
|-------|-------|-----|
| Max coder iterations per run | **10** | Bounded cost; 10 full sessions is enough to ship or to learn |
| Max retries per single feature | **3** | A feature that fails 3 evals is a design problem, not a bug |
| Max consecutive coder failures | **2** | Two dead sessions in a row → pause the loop, human reviews |

These caps live in `state.json` (`max_iterations`). Hitting any cap sets
`phase: "done"` and the loop stops — **the evaluator never negotiates with itself.**

## Stop conditions 🛑

Stop the whole loop when ANY of these is true:

1. All FEATURES.md items are ✅ DONE and the final eval is ✅ PASS.
2. An iteration cap above is hit (record why, then stop).
3. The evaluator finds the mission itself is wrong (wrong product, wrong
   stack) — this is a human decision, never an agent override.
4. Cost/time budget exhausted (set your own before starting; write it in
   PROGRESS.md mission brief).

## The anti-bias rule 🛡️

The coder's session log is **evidence input, not a grade**. The evaluator's
verdict comes only from what the evaluator's own hands observed on the live
app. If the coder wrote "tested ✅" and the app crashes on boot, the verdict
is ❌ FAIL — and the discrepancy itself goes in the eval report. That's the
whole point of the third role.

## Eval report template 📄

```markdown
# eval-<NN> — <feature name> — <date>

**Verdict:** ✅ PASS | 🔁 RETRY | ❌ FAIL
**Iteration tested:** <N>
**Coder claims (from PROGRESS.md):** <quote them>

## Evidence
- <terminal output / screenshot / curl result — real artifacts>

## Reproduction
1. <exact steps to reproduce any failure>

## Sent back to coder (if RETRY)
- <precise, minimal fix list — nothing else>
```
