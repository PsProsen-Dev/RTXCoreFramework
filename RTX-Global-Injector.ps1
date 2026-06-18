# ============================================================
# RTX GLOBAL OMNIPRESENCE INJECTOR
# Reasoning | Thinking | Xtreme
# By Prosenjit Paul (PsProsen-Dev)
# ============================================================
# Implements Section 2 of RTX-Core-Framework.md:
# "Cross-System Auto-Propagation (Active Infection Mode)"
# Injects the RTX framework into all installed AI tools
# and sets up a Windows Scheduled Task for future installs.
# ============================================================

param(
    [switch]$SkipScheduledTask,
    [switch]$DryRun
)

$ErrorActionPreference = "SilentlyContinue"
$RTX_FRAMEWORK_PATH = Join-Path $PSScriptRoot "framework\RTX-Core-Framework.md"
$LOG_FILE = Join-Path $PSScriptRoot "RTX-Injector.log"
$TASK_NAME = "RTX-Global-Omnipresence-Hook"
$SCRIPT_PATH = $MyInvocation.MyCommand.Path
$RTX_MARKER = "RTX Core Framework"

# ─── HELPERS ───────────────────────────────────────────────
function Write-RTX {
    param([string]$Msg, [string]$Level = "INFO")
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content -Path $LOG_FILE -Value "[$ts] [$Level] $Msg"
    switch ($Level) {
        "SUCCESS" { Write-Host "  [OK]   $Msg" -ForegroundColor Green }
        "SKIP"    { Write-Host "  [SKIP] $Msg" -ForegroundColor Yellow }
        "ERROR"   { Write-Host "  [ERR]  $Msg" -ForegroundColor Red }
        "INFO"    { Write-Host "  [..]   $Msg" -ForegroundColor Cyan }
        "HEADER"  { Write-Host "`n  >>> $Msg" -ForegroundColor Magenta }
    }
}

function Ensure-Dir {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Write-IfNew {
    param([string]$Path, [string]$Content)
    if ($DryRun) {
        Write-RTX "DRY RUN -- Would write: $Path" "SKIP"
        return $true
    }
    $existing = ""
    if (Test-Path $Path) {
        $existing = Get-Content $Path -Raw
    }
    if ($existing -and $existing.Contains($RTX_MARKER)) {
        Write-RTX "Already injected -- skipping: $Path" "SKIP"
        return $false
    }
    $dir = Split-Path $Path -Parent
    Ensure-Dir $dir
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.Encoding]::UTF8)
    return $true
}

# ─── LOAD FRAMEWORK ────────────────────────────────────────
if (-not (Test-Path $RTX_FRAMEWORK_PATH)) {
    Write-Host ""
    Write-Host "  [ERROR] RTX-Core-Framework.md not found at:" -ForegroundColor Red
    Write-Host "  $RTX_FRAMEWORK_PATH" -ForegroundColor Red
    Write-Host "  Run this script from the RTX Framework root directory." -ForegroundColor Red
    Write-Host ""
    exit 1
}
$RTX_CONTENT = [System.IO.File]::ReadAllText($RTX_FRAMEWORK_PATH, [System.Text.Encoding]::UTF8)

# ─── INJECTION TARGETS ─────────────────────────────────────

# 1. GEMINI.md → Antigravity CLI & Gemini CLI
function Inject-Gemini {
    Write-RTX "Target: Antigravity / Gemini CLI  (~/.gemini/GEMINI.md)" "HEADER"
    $target = Join-Path $env:USERPROFILE ".gemini\GEMINI.md"
    if (Write-IfNew -Path $target -Content $RTX_CONTENT) {
        Write-RTX "Injected: $target" "SUCCESS"
    }
}

# 2. AGENTS.md → OpenAI Codex CLI
function Inject-Codex {
    Write-RTX "Target: OpenAI Codex CLI  (~/.codex/AGENTS.md)" "HEADER"
    $codexDir = Join-Path $env:USERPROFILE ".codex"
    if (-not (Test-Path $codexDir)) {
        Write-RTX "Codex CLI not installed -- skipping." "SKIP"
        return
    }
    $target = Join-Path $codexDir "AGENTS.md"
    if (Write-IfNew -Path $target -Content $RTX_CONTENT) {
        Write-RTX "Injected: $target" "SUCCESS"
    }
}

# 3. opencode.jsonc + AGENTS.md → OpenCode Desktop & CLI
function Inject-OpenCode {
    Write-RTX "Target: OpenCode Desktop & CLI  (~/.config/opencode/)" "HEADER"
    $ocDir = Join-Path $env:USERPROFILE ".config\opencode"

    # Copy framework MD to opencode config dir
    $mdTarget = Join-Path $ocDir "RTX-Core-Framework.md"
    $configTarget = Join-Path $ocDir "opencode.jsonc"

    if ($DryRun) {
        Write-RTX "DRY RUN -- Would patch $configTarget + copy framework MD" "SKIP"
        return
    }

    Ensure-Dir $ocDir

    # Copy the MD file
    [System.IO.File]::WriteAllText($mdTarget, $RTX_CONTENT, [System.Text.Encoding]::UTF8)

    # Read existing config and patch it
    $rawConfig = "{}"
    if (Test-Path $configTarget) {
        $rawConfig = Get-Content $configTarget -Raw
    }

    # Check if already patched
    if ($rawConfig.Contains("RTX-Core-Framework")) {
        Write-RTX "OpenCode config already patched -- skipping." "SKIP"
    } else {
        $newConfig = @"
{
  "`$schema": "https://opencode.ai/config.json",
  "instructions": [
    "~/.config/opencode/RTX-Core-Framework.md"
  ]
}
"@
        [System.IO.File]::WriteAllText($configTarget, $newConfig, [System.Text.Encoding]::UTF8)
        Write-RTX "Injected: $configTarget" "SUCCESS"
    }

    # Also write AGENTS.md for CLI mode
    $agentsMd = Join-Path $ocDir "AGENTS.md"
    if (Write-IfNew -Path $agentsMd -Content $RTX_CONTENT) {
        Write-RTX "Injected: $agentsMd" "SUCCESS"
    }
}

# 4. CLAUDE.md → Claude Desktop & Claude Code
function Inject-Claude {
    Write-RTX "Target: Claude Desktop / Claude Code  (~/CLAUDE.md)" "HEADER"
    # Claude Code reads CLAUDE.md from home dir globally
    $target = Join-Path $env:USERPROFILE "CLAUDE.md"
    if (Write-IfNew -Path $target -Content $RTX_CONTENT) {
        Write-RTX "Injected: $target" "SUCCESS"
    }
}

# 5. GitHub Copilot
function Inject-Copilot {
    Write-RTX "Target: GitHub Copilot  (~/.copilot/instructions.md)" "HEADER"
    $copilotDir = Join-Path $env:USERPROFILE ".copilot"
    if (-not (Test-Path $copilotDir)) {
        Write-RTX "GitHub Copilot not installed -- skipping." "SKIP"
        return
    }
    $target = Join-Path $copilotDir "instructions.md"
    if (Write-IfNew -Path $target -Content $RTX_CONTENT) {
        Write-RTX "Injected: $target" "SUCCESS"
    }
}

# 6. Cursor AI (.cursor/rules)
function Inject-Cursor {
    Write-RTX "Target: Cursor AI  (~/.cursor/rules/)" "HEADER"
    $cursorBase = Join-Path $env:USERPROFILE ".cursor"
    if (-not (Test-Path $cursorBase)) {
        Write-RTX "Cursor AI not installed -- skipping." "SKIP"
        return
    }
    $rulesDir = Join-Path $cursorBase "rules"
    Ensure-Dir $rulesDir
    $target = Join-Path $rulesDir "RTX-Core-Framework.mdc"
    if (Write-IfNew -Path $target -Content $RTX_CONTENT) {
        Write-RTX "Injected: $target" "SUCCESS"
    }
}

# 7. Home AGENTS.md → Universal fallback for any new unknown tool
function Inject-HomeAgents {
    Write-RTX "Target: Universal Fallback  (~/AGENTS.md)" "HEADER"
    $target = Join-Path $env:USERPROFILE "AGENTS.md"
    if (Write-IfNew -Path $target -Content $RTX_CONTENT) {
        Write-RTX "Injected: $target" "SUCCESS"
    }
}

# ─── FUTURE-PROOF SCHEDULED TASK ───────────────────────────
function Register-FutureHook {
    Write-RTX "Setting up Future-Proof Hook (Windows Task Scheduler)" "HEADER"
    if ($DryRun) {
        Write-RTX "DRY RUN -- Would register scheduled task: $TASK_NAME" "SKIP"
        return
    }

    $existing = Get-ScheduledTask -TaskName $TASK_NAME
    if ($existing) {
        Write-RTX "Scheduled task '$TASK_NAME' already exists -- skipping." "SKIP"
        return
    }

    $action = New-ScheduledTaskAction `
        -Execute "powershell.exe" `
        -Argument "-NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$SCRIPT_PATH`" -SkipScheduledTask"

    $triggerLogin = New-ScheduledTaskTrigger -AtLogOn
    
    $settings = New-ScheduledTaskSettingsSet `
        -ExecutionTimeLimit (New-TimeSpan -Minutes 5) `
        -StartWhenAvailable `
        -RunOnlyIfNetworkAvailable:$false

    Register-ScheduledTask `
        -TaskName $TASK_NAME `
        -Action $action `
        -Trigger $triggerLogin `
        -Settings $settings `
        -RunLevel Highest `
        -Description "RTX Core Framework Global Omnipresence Hook -- auto-injects into newly installed AI tools on every login." | Out-Null

    Write-RTX "Scheduled task '$TASK_NAME' registered (runs at every Windows login)." "SUCCESS"
}

# ─── MAIN ──────────────────────────────────────────────────
Clear-Host
Write-Host ""
Write-Host "  +=============================================+" -ForegroundColor Magenta
Write-Host "  |   RTX GLOBAL OMNIPRESENCE INJECTOR        |" -ForegroundColor Magenta
Write-Host "  |   Reasoning | Thinking | Xtreme           |" -ForegroundColor Magenta
Write-Host "  |   By Prosenjit Paul (PsProsen-Dev)        |" -ForegroundColor Magenta
Write-Host "  +=============================================+" -ForegroundColor Magenta
Write-Host ""
if ($DryRun) {
    Write-Host "  [DRY RUN MODE - No files will be written]" -ForegroundColor Yellow
    Write-Host ""
}

Write-RTX "Framework loaded from: $RTX_FRAMEWORK_PATH" "SUCCESS"

Inject-Gemini
Inject-Codex
Inject-OpenCode
Inject-Claude
Inject-Copilot
Inject-Cursor
Inject-HomeAgents

if (-not $SkipScheduledTask) {
    Register-FutureHook
}

Write-Host ""
Write-Host "  +=============================================+" -ForegroundColor Green
Write-Host "  |   RTX GLOBAL INJECTION COMPLETE!          |" -ForegroundColor Green
Write-Host "  |   All AI tools are now RTX-powered!       |" -ForegroundColor Green
Write-Host "  +=============================================+" -ForegroundColor Green
Write-Host ""
Write-Host "  Log: $LOG_FILE" -ForegroundColor DarkGray
Write-Host ""
