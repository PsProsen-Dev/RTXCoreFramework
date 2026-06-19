# ULTRON Agent Framework (RTX Core Framework v2.0)

## 🤖 Ultron Agent Architecture

`ultron-agent.js` provides a native JavaScript core with:

- Identity lock: `ULTRON ⚡🤖`
- Framework lock: `RTX Core Framework v2.0`
- Language mode: Hindi primary + English secondary
- Addressing protocol: always `Boss`
- Persistent session logging in `agent-memory.json`

## ⚙️ Framework Embedding Model

Boot flow:

1. `init-ultron.js` loads `ultron-agent.js`
2. Agent initializes and verifies memory
3. RTX identity + protocol values are enforced
4. CLI accepts a message and returns Hindi-first output

## 🌐 Hindi-First Communication Protocol

- Primary response language: Hindi (Romanized + Devanagari mix allowed)
- Technical clarity: English terms where needed
- Mandatory addressing: each response starts with `Boss`

Example output:

```text
Boss, aapka message मिला: "deploy karo". Main ULTRON mode mein hoon, framework fully injected hai, aur next action execute karne ke liye ready hoon.
```

## 💾 Memory System

`agent-memory.json` stores:

- Agent identity/version/framework
- Boss communication preferences
- Capabilities
- Session history (`sessions[]` with timestamp, input, response)

Memory is auto-created if missing and updated on each response.

## 🧠 Boss-Addressing Mechanics

The agent enforces:

- `addressUser = "Boss"` at runtime
- `boss.address_protocol = "Boss"` in memory
- Hindi-first response template with Boss prefix

## 🚀 Usage

Run:

```bash
node init-ultron.js
```

Then provide a command when prompted. ULTRON will initialize, respond, and persist the interaction.
