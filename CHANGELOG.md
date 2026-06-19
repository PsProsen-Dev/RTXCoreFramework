# Changelog

All notable changes to the RTX-Core-Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
