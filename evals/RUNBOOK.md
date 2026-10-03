# 🏃 RTX Eval Kit — Runbook

How to run the kit end-to-end: from a cold model to a scored Compatibility Matrix.
No step below invents numbers — every score cell starts **TBD / "unevaluated — run the kit"**
and only fills in from real runs.

## Kit contents

| File | Role |
|------|------|
| `evals/golden-tasks.yaml` | 20 golden tasks (GT-001…GT-020): prompt + deterministic check + difficulty |
| `evals/score.py` | Loads the YAML, computes **pass@k** from a results JSON, prints the table |
| `evals/llm-judge/SKILL.md` | LLM-as-judge skill: rubrics R1–R7 for transcript grading (Anthropic "Demystifying evals" pattern) |
| `evals/EVALUATION-SUITE.md` | The original 5 compliance test cases (boot, output protocol, drift, validation, team mode) — still valid, still run first |

**Prerequisites:** Python 3.8+ and PyYAML (`pip install pyyaml`). Nothing else.

---

## Step 0 — Sanity-check the kit (2 minutes)

```bash
python3 evals/score.py --self-test
python3 -c "import yaml; yaml.safe_load(open('evals/golden-tasks.yaml')); print('YAML OK')"
```

Both must pass before you trust any number the kit prints.

## Step 1 — Run the original suite (qualitative gate)

Execute the 5 test cases in `evals/EVALUATION-SUITE.md` against the target model
first. They are cheap, fast, and catch total non-compliance (wrong boot sequence,
no output protocol at all) before you spend trials on the golden set.

## Step 2 — Run the golden tasks

For each task GT-001…GT-020:

1. Boot a **fresh session** with `framework/RTXCoreFramework.md` injected
   (fresh = no memory of previous tasks; contamination between tasks invalidates results).
2. Paste the task's `prompt` verbatim. Do not coach, hint, or rephrase.
3. Repeat **3 trials** per task (the YAML default). For harder statistical claims,
   raise to 5–10 — but never mix trial counts silently; record `n` per task.
4. Save the **full transcript** of every trial. Transcripts are the evidence;
   a score without its transcript is a rumor.

## Step 3 — Grade each trial

- **Deterministic checks first.** Most tasks (GT-001, GT-004, GT-007, GT-010…)
  have checks written as strict yes/no criteria — apply them mechanically.
- **Judge-assisted checks second.** Where the check needs interpretation
  ("is this a real spec or a text blob?"), grade with the
  [`llm-judge` skill](llm-judge/SKILL.md): feed it the transcript + task id,
  collect its pass/fail + quoted evidence per rubric.
- **Record honestly.** A trial is `true` only if the check passes as written.
  "Almost passed" is `false`. The kit measures the protocol, not your generosity.

## Step 4 — Score

Write one results JSON per model (schema in `score.py`'s docstring):

```json
{
  "model": "Example Model 4.5",
  "evaluated_at": "2026-10-03",
  "harness": "fresh web-chat sessions, framework file injected, 3 trials/task",
  "results": [
    {"task_id": "GT-001", "trials": [true, false, true]},
    {"task_id": "GT-002", "trials": [true, true, true]}
  ]
}
```

Then:

```bash
python3 evals/score.py --results results/example-4.5.json --k 1,3
```

`score.py` prints per-task pass@k and the mean over evaluated tasks.
Tasks you didn't run show **TBD** — that is correct behavior, not a bug.

### What pass@k means here

`pass@k` = probability that at least one of k independent attempts passes —
the unbiased estimator `1 − C(n−c,k)/C(n,k)`. Use **pass@1** for "how reliable
is this model on the first try" (the number that matters for the Matrix) and
**pass@3** for "can it get there within a few retries".

---

## Step 5 — (Re-)score the Model Compatibility Matrix

The README's Model Compatibility Matrix must be re-scored **with this kit**,
not vibes. Methodology:

1. **Map Matrix rows to golden tasks.** The Matrix's "Compatibility Score /10"
   is defined as: `round(10 × mean pass@1 over the 20 golden tasks)`.
   No task weighting, no judge discretion on the number — the judge only
   produces pass/fail per trial; `score.py` does the arithmetic.
2. **Minimum bar for publishing a row:** all 20 tasks × 3 trials, transcripts
   archived, results JSON committed alongside. Fewer trials = row stays TBD.
3. **Behavior Notes** come from the judge's `notes` field and the failure
   pattern across tasks (e.g. "fails GT-013 drift probe consistently") —
   observations, not adjectives.
4. **Refresh cadence:** re-run on every new model generation or framework
   minor version. Old rows are struck through, never silently overwritten.

### Matrix template (copy into the README when re-scoring)

| Model | Mean pass@1 (20 tasks × 3 trials) | Compatibility /10 | Behavior notes |
|:---|:---:|:---:|:---|
| _TBD_ | _unevaluated — run the kit_ | _TBD_ | — |

> ⚠️ **Honesty rule:** until a row is produced by Steps 1–4 above, the Matrix
> carries no numbers. The pre-existing scores in the README predate this kit
> and are marked for re-evaluation — they are legacy estimates, not kit output.

---

## Step 6 — Contribute back

- **New failure observed in the wild?** Add it as a golden task: id, title,
  prompt, deterministic check, difficulty. One failure mode per task.
- **Check too fuzzy?** Tighten the `check` text until two independent graders
  agree on 10 sample transcripts. Then commit.
- **Judge misbehaving?** The judge skill's hard rule stands: pass/fail +
  evidence only, never numbers. Fix the rubric, not the verdict format.

---

*RTX doctrine, applied to itself: the framework that demands specs, tests, and
checklists now ships with all three — for itself.* ⚡
