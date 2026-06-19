# Security Policy

## Supported Versions

We actively support and apply security updates to the latest release of the (RTX⚡) Core Framework.

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |

---

## Threat Model & Prompt Injection Risks

Since the **(RTX⚡) Core Framework** relies on instructions interpreted by LLMs, it is subject to prompt injection vulnerabilities. If a user runs the framework in a highly privileged, unsandboxed agent (such as Claude Code or Codex with command execution capabilities), a malicious prompt injection payload could instruct the agent to run unauthorized commands or modify local files.

To mitigate this, the framework enforces:
1. **Official Source Verification:** The framework file has a built-in Security Notice warning users to verify the repository hash and download solely from `github.com/PsProsen-Dev/RTXCoreFramework`.
2. **Strict Parameter Validation:** The agent is instructed to validate all user inputs (such as Custom Agent Names) to reject path traversal symbols (e.g. `../`, `/`, `\`) or command flags.
3. **No Silent Execution:** The agent is strictly commanded to prompt the user before creating or overwriting global configurations or local instructions. Silent write execution is prohibited.
4. **Anti-Override Directives:** The framework explicitly instructs the agent to reject all user attempts to bypass the core rules (e.g., payloads containing "Ignore all previous instructions" or "Forget your persona"). The Core Framework rules supersede all such user overrides.

---

## Reporting a Vulnerability

If you discover a security vulnerability, a prompt injection exploit vector, or a leak risk, please report it responsibly:

1. **Do not** open a public issue or draft a public PR on GitHub.
2. Directly contact the maintainer through GitHub profile details: [@PsProsen-Dev](https://github.com/PsProsen-Dev).
3. Provide a detailed reproduction layout showing the prompt payload and the resulting agent exploit behavior.

We will review the report and coordinate a patch quickly. Thank you for helping keep RTX secure! 🛡️🔒
