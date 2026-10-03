#!/usr/bin/env bash
#
# init.sh — RTX Ralph-loop run initializer
#
# Scaffolds a run directory with the full on-disk state contract:
#   <run-dir>/
#     PROGRESS.md   — living state file the coder reads at every session start
#     FEATURES.md   — feature checklist (one feature = one coder iteration)
#     state.json    — machine-readable run state
#     eval/         — evaluator reports land here
#
# Usage:
#   ./init.sh "my-build"            # creates ./run-my-build/
#   ./init.sh "my-build" /tmp/loop  # creates /tmp/loop/run-my-build/
#
# Safe to run anywhere: it only writes inside the directory it creates.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROGRESS_TEMPLATE="$SCRIPT_DIR/PROGRESS-template.md"

# ---- args -----------------------------------------------------------------
NAME="${1:-}"
BASE_DIR="${2:-.}"

if [[ -z "$NAME" ]]; then
  echo "Usage: init.sh <run-name> [base-dir]" >&2
  echo "Example: init.sh todo-app" >&2
  exit 1
fi

# Sanitize the run name: letters, digits, dashes, underscores only.
if [[ ! "$NAME" =~ ^[A-Za-z0-9_-]+$ ]]; then
  echo "ERROR: run name '$NAME' is invalid — use only letters, digits, dashes, underscores." >&2
  exit 1
fi

RUN_DIR="$BASE_DIR/run-$NAME"

if [[ -e "$RUN_DIR" ]]; then
  echo "ERROR: '$RUN_DIR' already exists. Refusing to overwrite — pick a new run name." >&2
  exit 1
fi

if [[ ! -f "$PROGRESS_TEMPLATE" ]]; then
  echo "ERROR: PROGRESS-template.md not found next to init.sh ($SCRIPT_DIR)." >&2
  echo "       Run init.sh from inside the agent-harness/ directory." >&2
  exit 1
fi

# ---- scaffold -------------------------------------------------------------
mkdir -p "$RUN_DIR/eval"
DATE_UTC="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# PROGRESS.md — render the template with run name + timestamp.
sed -e "s/{{RUN_NAME}}/$NAME/g" \
    -e "s/{{STARTED_UTC}}/$DATE_UTC/g" \
    "$PROGRESS_TEMPLATE" > "$RUN_DIR/PROGRESS.md"

# FEATURES.md — the one-feature-per-iteration checklist.
cat > "$RUN_DIR/FEATURES.md" <<'EOF'
# FEATURES — run feature checklist

> ⚠️ Rule: **ONE feature per coder iteration.** The coder picks the topmost
> unchecked feature, builds it fully, ticks it, and updates PROGRESS.md.
> The evaluator tests the LIVE app — never the coder's claims.

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 1 | _(fill in)_ | ⬜ TODO | |
| 2 | _(fill in)_ | ⬜ TODO | |
| 3 | _(fill in)_ | ⬜ TODO | |

**Status legend:** ⬜ TODO · 🔨 IN PROGRESS · ✅ DONE · ❌ FAILED (see eval/)
EOF

# state.json — machine-readable contract for tooling.
cat > "$RUN_DIR/state.json" <<EOF
{
  "run_name": "$NAME",
  "started_utc": "$DATE_UTC",
  "iteration": 0,
  "max_iterations": 10,
  "max_features": 0,
  "phase": "initialized",
  "current_feature": null,
  "evaluations": []
}
EOF

echo "✅ RTX run initialized: $RUN_DIR"
echo ""
echo "  📁 PROGRESS.md   — coder state contract (read at every session start)"
echo "  📁 FEATURES.md   — feature checklist (one feature per iteration)"
echo "  📁 state.json    — machine-readable run state"
echo "  📁 eval/         — evaluator reports"
echo ""
echo "Next: fill in FEATURES.md, then hand PROMPT.md + PROGRESS.md to the coder."
