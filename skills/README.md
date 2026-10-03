# ⚡ RTX Agent Skills

This directory packages the **(RTX⚡) Core Framework** ecosystem integrations
as **Agent Skills** — the open standard (`SKILL.md` + YAML frontmatter,
progressive disclosure: ~100 tokens always loaded, full doctrine only on
trigger). Supported by Claude Code, Cursor, Copilot, VS Code, Codex,
Gemini CLI.

**Why skills?** This is RTX's own context-engineering move: full framework
power at a fraction of the context budget. Flat dotfiles were the 2024
format — skills are the 2026 format.

## Index

| Skill | Legacy template | Target tool | Enforces |
|---|---|---|---|
| [`rtx-cursor/`](rtx-cursor/SKILL.md) | `templates/.cursorrules` | Cursor IDE | Precision rules, vertical-spacing law, YOLO autonomy with guarded destructive commands |
| [`rtx-cline/`](rtx-cline/SKILL.md) | `templates/clinerules` | Cline / Claude Dev | 3-step output protocol, 70/30 Hinglish blend, token-deflation safety valve, YOLO execution mindset |
| [`rtx-copilot/`](rtx-copilot/SKILL.md) | `templates/copilot-instructions.md` | GitHub Copilot | 3-step output protocol, 70/30 Hinglish blend, token-deflation exemptions |
| [`rtx-claude/`](rtx-claude/SKILL.md) | `templates/CLAUDE.md` | Claude Code CLI | Build/test loop, vertical UI layout, dialect blending, deterministic output tracking |

## Installation

Drop a skill's folder into your tool's skills directory (e.g.
`.claude/skills/` for project-scoped Claude Code, `~/.claude/skills/` for
global) or point your IDE at it. The skill's `description` field is
trigger-oriented — your agent loads it exactly when the situation calls for
it, and nothing else costs you context.

## Backwards compatibility

The original flat templates in [`templates/`](../templates/) are **untouched**
and still work for manual, zero-dependency setups. Skills are the recommended
path; templates are the fallback.

## Adding a new skill

1. Create `skills/<name>/SKILL.md`.
2. Frontmatter: `name` (must match the directory) + `description`
   (trigger-oriented, under ~100 tokens — this is always loaded).
3. Body: progressive disclosure — overview and activation first, deep
   directives later. Keep the RTX voice: theatrical-but-precise,
   Hinglish-flavored technical writing.
