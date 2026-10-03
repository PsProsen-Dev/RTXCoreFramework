#!/usr/bin/env python3
"""⚡ RTX Eval Kit — scorer.

Loads the golden task set, reads a results JSON, computes pass@k per task
(and overall), and prints a summary table.

Results JSON schema:
    {
      "model": "Model Name (free text, e.g. 'Claude Sonnet 4.5')",
      "evaluated_at": "2026-10-03",
      "harness": "how the transcripts were produced",
      "results": [
        {"task_id": "GT-001", "trials": [true, false, true]},
        ...
      ]
    }

Each entry in "trials" is one independent run of that task's prompt:
true = the deterministic check PASSED, false = FAILED.

pass@k for a task with n trials and c passes (the unbiased estimator):
    pass@k = 1 - C(n - c, k) / C(n, k)      (k <= n; if k > n we use k = n)

Usage:
    python3 evals/score.py --results results.json [--k 1,3,5]
    python3 evals/score.py --self-test        # runs the built-in sanity check
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
TASKS_FILE = REPO_ROOT / "evals" / "golden-tasks.yaml"


def load_tasks(path: Path = TASKS_FILE) -> dict:
    """Load the golden task set. Returns {task_id: task_dict}."""
    import yaml  # PyYAML — stdlib has no YAML parser; declared in RUNBOOK.md

    with open(path, encoding="utf-8") as f:
        data = yaml.safe_load(f)
    tasks = data.get("tasks", [])
    return {t["id"]: t for t in tasks}


def pass_at_k(n: int, c: int, k: int) -> float | None:
    """Unbiased pass@k estimator. None if the task has no trials."""
    if n <= 0:
        return None
    k = min(k, n)
    if k <= 0:
        return None
    if n - c < k:
        return 1.0
    return 1.0 - math.comb(n - c, k) / math.comb(n, k)


def score_results(results: dict, ks: list[int]) -> dict:
    """Score every task present in the results JSON.

    Returns {task_id: {"n": n, "c": c, "pass@k": value_or_None, ...}}.
    Tasks with no entry are reported as unevaluated (None), never as zero.
    """
    scored: dict = {}
    for entry in results.get("results", []):
        tid = entry.get("task_id")
        trials = entry.get("trials", [])
        n = len(trials)
        c = sum(1 for t in trials if t)
        scored[tid] = {"n": n, "c": c}
        for k in ks:
            scored[tid][f"pass@{k}"] = pass_at_k(n, c, k)
    return scored


def render_table(tasks: dict, scored: dict, ks: list[int], model: str) -> str:
    """Render the summary table. Unevaluated tasks show TBD, never 0."""
    headers = ["Task", "Title", "n", "pass"] + [f"pass@{k}" for k in ks]
    rows = []
    for tid, task in tasks.items():
        s = scored.get(tid)
        if s is None:
            rows.append([tid, task["title"][:34], "—", "—"]
                        + ["TBD"] * len(ks))
        else:
            row = [tid, task["title"][:34], str(s["n"]), f"{s['c']}/{s['n']}"]
            for k in ks:
                v = s[f"pass@{k}"]
                row.append("TBD" if v is None else f"{v:.2f}")
            rows.append(row)

    widths = [max(len(r[i]) for r in rows + [headers]) for i in range(len(headers))]
    def fmt(r): return " | ".join(c.ljust(w) for c, w in zip(r, widths))
    lines = [f"Model: {model}", "",
             fmt(headers),
             "-+-".join("-" * w for w in widths)]
    lines += [fmt(r) for r in rows]

    # Overall: mean of per-task pass@k over EVALUATED tasks only.
    lines.append("")
    evaluated = [tid for tid in tasks if tid in scored and scored[tid]["n"] > 0]
    lines.append(f"Evaluated: {len(evaluated)}/{len(tasks)} tasks")
    for k in ks:
        vals = [scored[tid][f"pass@{k}"] for tid in evaluated
                if scored[tid][f"pass@{k}"] is not None]
        if vals:
            lines.append(f"Mean pass@{k}: {sum(vals)/len(vals):.3f} "
                         f"(over {len(vals)} evaluated tasks)")
        else:
            lines.append(f"Mean pass@{k}: unevaluated — run the kit")
    lines.append("")
    lines.append("TBD = unevaluated — run the kit. No invented numbers, ever.")
    return "\n".join(lines)


def cmd_score(args: argparse.Namespace) -> int:
    tasks = load_tasks(Path(args.tasks))
    with open(args.results, encoding="utf-8") as f:
        results = json.load(f)
    ks = [int(x) for x in args.k.split(",")]
    scored = score_results(results, ks)
    print(render_table(tasks, scored, ks, results.get("model", "unknown")))
    return 0


def cmd_self_test(_args: argparse.Namespace) -> int:
    """Built-in sanity check: known trials -> known pass@k values."""
    # GT-001: 3 trials, 2 passes.
    #   pass@1 = 2/3, pass@3 = 1.0, pass@2 = 1 - C(1,2)/C(3,2) = 1.0
    # GT-002: 3 trials, 0 passes -> pass@1 = 0.0, pass@2 = 0.0
    # GT-003: 1 trial, 1 pass -> pass@5 uses k=min(5,1)=1 -> 1.0
    sample = {
        "model": "self-test",
        "results": [
            {"task_id": "GT-001", "trials": [True, True, False]},
            {"task_id": "GT-002", "trials": [False, False, False]},
            {"task_id": "GT-003", "trials": [True]},
        ],
    }
    ks = [1, 2, 3, 5]
    scored = score_results(sample, ks)

    def close(a, b): return abs(a - b) < 1e-9
    checks = [
        ("GT-001 pass@1 == 2/3", close(scored["GT-001"]["pass@1"], 2 / 3)),
        ("GT-001 pass@3 == 1.0",  scored["GT-001"]["pass@3"] == 1.0),
        ("GT-002 pass@1 == 0.0",  scored["GT-002"]["pass@1"] == 0.0),
        ("GT-002 pass@2 == 0.0",  scored["GT-002"]["pass@2"] == 0.0),
        ("GT-003 pass@5 == 1.0 (k capped at n)",
         scored["GT-003"]["pass@5"] == 1.0),
        ("missing task has no entry", "GT-004" not in scored),
    ]
    ok = True
    for name, passed in checks:
        print(("✅ " if passed else "❌ ") + name)
        ok = ok and passed

    # The YAML itself must parse and hold 20 tasks.
    tasks = load_tasks()
    yaml_ok = len(tasks) == 20 and all(
        {"id", "title", "prompt", "check", "difficulty"} <= set(t)
        for t in tasks.values()
    )
    print(("✅ " if yaml_ok else "❌ ")
          + f"golden-tasks.yaml parses: {len(tasks)} tasks, all fields present")
    ok = ok and yaml_ok

    print("\n" + ("ALL SELF-TESTS PASSED ⚡" if ok else "SELF-TEST FAILED ❌"))
    return 0 if ok else 1


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(
        description="RTX Eval Kit scorer — pass@k over the golden task set.")
    p.add_argument("--tasks", default=str(TASKS_FILE),
                   help="path to golden-tasks.yaml")
    p.add_argument("--results",
                   help="results JSON file (schema in module docstring)")
    p.add_argument("--k", default="1,3",
                   help="comma-separated k values for pass@k (default: 1,3)")
    p.add_argument("--self-test", action="store_true",
                   help="run the built-in sanity check and exit")
    args = p.parse_args(argv)

    if args.self_test:
        return cmd_self_test(args)
    if not args.results:
        p.error("--results is required (or use --self-test)")
    return cmd_score(args)


if __name__ == "__main__":
    sys.exit(main())
