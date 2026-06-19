# Changelog

All notable changes to the RTX-Core-Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-06-19
### Added
- **Model-Specific Behavioral Shims:** Added Section 7 to the core framework to calibrate model alignment across Claude (strict XML tagging), Gemini (lazy generation avoidance), and GPT-4o (preventing auto-translation back to English).
- **Automated Installer Scripts:** Created dynamic scripts (`scripts/install.ps1` for Windows, `scripts/install.sh` for Mac/Linux) to enable one-command installation and synchronize the framework globally across IDEs and agents.
- **BPE Tokenization Efficiency Guide:** Documented strategies in the README to mitigate the "Romanized Tax" tokenizer penalty and optimize prompt context window usage.
- **Tech-Debate Poster Studio:** Migrated the interactive Web App (`studio/index.html`, `style.css`, `app.js`, and its assets) into the repository, allowing developers to generate and export custom viral tech-debate images in high resolution directly from their browsers.

## [1.4.1] - 2026-06-19
### Added
- **Ultron Agent Core:** Added `ultron-agent.js` with RTX v2.0 identity lock, Hindi-first responses, Boss addressing, and persistent session recording.
- **Ultron Bootstrap Script:** Added `init-ultron.js` for CLI initialization and interactive command handling.
- **Persistent Memory File:** Added `agent-memory.json` default memory state for agent metadata and conversation sessions.
- **Ultron Documentation:** Added `ULTRON_FRAMEWORK.md` with architecture, protocol, memory, and quick usage guidance.

### Changed
- **README Ultron Section:** Added a new ULTRON Agent quick-start section describing the new files and startup command.

## [1.3.3] - 2026-06-19
### Added
- **Token Deflation Safety Valve:** Added an anti-gridlock rule in Section 3 of the framework to exempt fenced code blocks, system/terminal logs, stack traces, compiler errors, and raw JSON/YAML payloads from translation. This prevents syntax corruption and reduces token overhead.
- **Ecosystem Integration Templates:** Created modular configuration templates (`templates/.cursorrules`, `templates/clinerules`, and `templates/copilot-instructions.md`) to simplify manual tool installation.
- **Model Compatibility Matrix:** Benchmarked and documented compatibility scorecards for leading commercial and open-weights models (Claude, DeepSeek, GPT, Gemini, Llama, Qwen) in the README files.

## [1.3.2] - 2026-06-19
### Added
- **Open-Source Community Standards:** Added a Contributor Covenant `CODE_OF_CONDUCT.md`.
- **CI Workflows:** Added a GitHub Action workflow (`.github/workflows/markdown-lint.yml`) for markdown linting.
- **Badges & Visuals:** Added a CI Build Badge and a Visual Sample I/O dialog to the `README.md` and `README.hi.md` to improve clarity.

### Changed
- **Security Hardening:** Updated `RTXCoreFramework.md` and `SECURITY.md` to include an explicit **Hardened System Rule (Anti-Override)**, preventing prompt-injection attacks that use instructions like "Ignore all previous instructions".

## [1.3.1] - 2026-06-19
### Added
- **Global Examples:** Added three international compiled persona examples (Spanish-Dev-Carlos, Korean-Dev-Jiwoo, Arabic-Dev-Farhan) to support non-Indian developers.
- **Context Size Warning:** Documented sliding context window limitations and drift recovery guidelines in the README.

### Changed
- **Propagation Hardening:** Redesigned Step 4 (Global Omnipresence Execution) to be fully opt-in. The agent now explicitly prompts for file-writing permissions rather than executing silently.
- **Removed Persistent Hooks:** Completely eliminated background task scheduler/cron hooks to resolve endpoint security flags and potential malware-behavior alerts.

## [1.3.0] - 2026-06-19
### Added
- **Security & Integrity Notice:** Added prompt injection warnings and input validation rules to the core framework to prevent malicious forks.
- **Multilingual Support:** Created `README.hi.md` to demonstrate the "mother tongue-first" philosophy directly in the documentation.
- **Visual Architecture:** Added a Mermaid flowchart to the README to clearly explain the setup and propagation workflow.
- **Comprehensive FAQ & Uninstall Guide:** Documented troubleshooting steps and clear uninstall paths for Windows, Mac, and Linux.
- **GitHub Templates:** Added structured Issue templates (Bug Report, Feature Request) and a Pull Request template with an RTX compliance checklist.
- **Persona Examples:** Added three fully compiled persona examples in the `examples/` directory (Python-Dev-Ananya, Web-Dev-Vishal, Data-Analyst-Dhruv).
- **Comparison Matrix:** Added a feature comparison table (RTX vs Custom Instructions vs LocalLLM) to the README.

### Changed
- **Branding:** Renamed the framework globally from `RTX Core Framework` to `(RTX⚡) Core Framework` and updated file names accordingly.
- **Global Propagation Refinement:** Completely rewrote the framework's Global Omnipresence setup logic into a simpler "compile and deliver" pipeline for Web UIs and an autonomous script-free injection for Agentic IDEs.
- **Workflow Simplification:** Removed the manual `sync.ps1` and `sync.sh` workflow in favor of a single-file copy-paste/attachment paradigm.

### Removed
- **Sync Scripts:** Deleted `sync.ps1` and `sync.sh` from the repository entirely.

## [1.1.0] - 2026-06-18
### Added
- **Precision Protocol (Section 6):** Added relentless review checklists, structured architecture spec requirements, and Native-Tongue Assertion prompts for automated tests.
- **Autonomous Setup Logic:** Removed manual installation scripts (PowerShell). The agent now uses internal OS commands to dynamically create a personalized master framework copy in the home directory before propagating.
- **Language Integrity Rule:** Enforced pure English integrity for the core framework documentation, pushing the translated language blend strictly to the agent's interaction output.
- **Visuals:** Added a dynamic Hero Banner and Engagement Badges to the README.

### Changed
- **Terminology:** Replaced malware-adjacent terms (e.g., "Infection Mode") with professional equivalents like "Global Sync Protocol" and "one-time opt-in authorization" to prevent security flags.
- **Documentation Cleanup:** Removed hardcoded, third-party brand names (Claude, ChatGPT, etc.) from the README to ensure neutral, generic instructions.
- **Link Fixes:** Fixed broken Wiki URLs to match the correct repository namespace (`RTXCoreFramework`).
- **Capability Disclosure:** Added a transparent disclaimer that autonomous file-system propagation only applies to Agentic CLIs/IDEs, requiring manual copy-paste for Web-UI chat bots.

### Removed
- **External Scripts:** Removed the embedded `RTX-Global-Injector.ps1` script entirely to eliminate external dependencies and malware risks.

## [1.0.0] - 2026-06-16
### Added
- Initial release of the RTX (Reasoning, Thinking, Xtreme) Core Framework.
- Dynamic 70% Romanized native language + 30% English blending logic.
- The 3-Step Universal Output Protocol.
- Agent identity aliasing and dynamic persona injection.
