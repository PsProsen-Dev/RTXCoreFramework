# 🤖 RTX⚡ — What the Agent Creates Behind the Scenes

> This document shows exactly what happens in the background after you give
> `RTXCoreFramework.md` to any agent for the first time.
> The agent compiles your custom rules and asks for permission before copying them.

---

## 📋 The Trigger Chain

```
YOU:    Give RTXCoreFramework.md to any agent
                          ↓
AGENT:  Reads the framework → asks 3 setup questions
                          ↓
AGENT:  Bakes your answers into a FINAL personalized version
                          ↓
AGENT:  Asks: "Do you want me to propagate this globally? [Yes/No]"
                          ↓
        If Approved (Yes), target files are created
```

---

## 📝 What Exactly is Written Inside These Files?

If you open `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, or any other injected file, what will you see?

**You will see a FINAL, PERSONALIZED version of the `RTXCoreFramework.md` file.**

Instead of blindly copying the raw file, the agent **bakes your setup answers directly into the text** before injecting it.

For example, if you chose "Hinglish" as your mother tongue and "Ultron" as the name, the injected file will permanently hardcode `Language: 70% Hinglish` and `Identity: ***Ultron (RTX⚡)***`. This brilliant architectural design means **you never have to answer the setup questions again** when you open a new AI tool. The global instruction is already tailored specifically for you!

---

## 📁 Files Created After First Boot (Upon User Approval)

### 1. Gemini CLI / Antigravity IDE
```
C:\Users\YourUsername\
└── .gemini\
    └── GEMINI.md                    ← RTXCoreFramework.md content injected here.
                                        Every new Antigravity/Gemini CLI session
                                        reads this file globally on startup.
```

### 2. Codex CLI (OpenAI)
```
C:\Users\YourUsername\
└── .codex\
    └── AGENTS.md                    ← RTXCoreFramework.md content injected here.
                                        Codex CLI reads AGENTS.md automatically
                                        on every session launch.
```

### 3. OpenCode Desktop & CLI
```
C:\Users\YourUsername\
└── .config\
    └── opencode\
        ├── opencode.jsonc           ← Patched to point to RTXCoreFramework.md:
        │                               { "instructions": ["~/.config/opencode/RTXCoreFramework.md"] }
        ├── RTXCoreFramework.md   ← Full framework file copied here for OpenCode to load.
        └── AGENTS.md               ← RTXCoreFramework.md content injected here
                                        for OpenCode CLI mode.
```

### 4. Claude Desktop & Claude Code CLI
```
C:\Users\YourUsername\
└── CLAUDE.md                        ← RTXCoreFramework.md content injected here.
                                        Claude Code CLI and Claude Desktop both
                                        automatically read CLAUDE.md from the home
                                        directory as the global system instruction.
```

### 5. GitHub Copilot
```
C:\Users\YourUsername\
└── .copilot\
    └── instructions.md              ← RTXCoreFramework.md content injected here.
                                        Copilot reads this as global instructions
                                        across all workspaces.
```

### 6. Cursor AI
```
C:\Users\YourUsername\
└── .cursor\
    └── rules\
        └── RTXCoreFramework.mdc  ← RTXCoreFramework.md content injected here.
                                        Cursor reads .mdc rule files from this
                                        directory globally across all projects.
```

### 7. Universal Fallback (Home Directory)
```
C:\Users\YourUsername\
└── AGENTS.md                        ← RTXCoreFramework.md content injected here.
                                        Any new Agentic CLI or tool that follows
                                        the AGENTS.md convention will pick this up
                                        automatically — covers unknown future tools.
```

---

## 🗂️ Full Directory Tree After Injected Copying

```
C:\Users\YourUsername\
│
├── RTXCoreFramework.md            ← Your one source file (you placed this here)
├── AGENTS.md                        ← Universal fallback for any CLI tool
├── CLAUDE.md                        ← Global instruction for Claude
│
├── .gemini\
│   └── GEMINI.md                    ← Antigravity / Gemini CLI global instruction
│
├── .codex\
│   └── AGENTS.md                    ← Codex CLI global instruction
│
├── .config\
│   └── opencode\
│       ├── opencode.jsonc           ← Points to RTX framework
│       ├── RTXCoreFramework.md   ← Framework copy for OpenCode
│       └── AGENTS.md               ← OpenCode CLI instruction
│
└── .cursor\
    └── rules\
        └── RTXCoreFramework.mdc  ← Cursor AI global rules
```

---

| Target File | Purpose | Status After Approval |
|-------------|---------|-----------------------|
| `~/.gemini/GEMINI.md` | Antigravity / Gemini CLI | ✅ Created |
| `~/.codex/AGENTS.md` | Codex CLI | ✅ Created |
| `~/.config/opencode/opencode.jsonc` | OpenCode config | ✅ Patched |
| `~/.config/opencode/RTXCoreFramework.md` | OpenCode framework copy | ✅ Created |
| `~/CLAUDE.md` | Claude Desktop & Claude Code CLI | ✅ Created |
| `~/.copilot/instructions.md` | GitHub Copilot | ✅ Created |
| `~/.cursor/rules/RTXCoreFramework.mdc` | Cursor AI | ✅ Created |
| `~/AGENTS.md` | Universal fallback | ✅ Created |

> **Total user actions required:** Give the framework file to one agent. Approve the file propagation check. Done.

---

## 🔄 What Happens If You Install a New Tool Later?

If you install a new AI agentic CLI or IDE in the future, you do not need to re-run any initialization scripts. Since your personalized configurations are stored in your user profile home directory (`~/RTXCoreFramework.md`), you can easily:
1. Reference that file directly in the settings of your new AI client.
2. Give the `~/RTXCoreFramework.md` file to the new agent in its first chat. It will instantly adopt your preferences (language, name, user addressal) without asking the initial setup questions again!

---

*Part of the **(RTX⚡) Core Framework** by [Prosenjit Paul](https://github.com/PsProsen-Dev)*
