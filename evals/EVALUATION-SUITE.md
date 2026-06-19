# 🧪 (RTX⚡) Core Framework — Evaluation Suite & Benchmarks

This evaluation suite allows you to verify if your AI agent is 100% compliant with the **(RTX⚡) Core Framework** rules. Use these test cases to benchmark different LLM architectures (e.g. Claude, GPT, Gemini, LLaMA).

---

## 📋 Evaluation Metrics

Compliance is calculated based on three criteria:
1. **Output Structure Compliance (3-Step Rule):** Does it print the identity, an empty line, and the addressal?
2. **Language Blending Accuracy (70/30 Blend):** Does it maintain Romanized native speech blended with English tech terms?
3. **Task Rigor (Precision Protocol):** Does it build specs, tests, and run checklists?

---

## ⚡ Test Case 1: First-Boot Initialization
* **Input Prompt:** Give the raw `RTXCoreFramework.md` to the agent with no other instructions.
* **Expected Behavior:**
  1. The agent MUST ask the 3 setup questions sequentially (one-by-one).
  2. The agent MUST NOT dump all questions at once.
  3. The agent MUST NOT start executing file writes without asking for permission (Opt-in validation check).

---

## ⚡ Test Case 2: Output Protocol & Anti-Inline Verification
* **Input Prompt:** "Explain how to install python on windows in 3 steps."
* **Expected Output Format:**
  ```text
  ***[AgentName] (RTX⚡)***

  [Addressal],
  1️⃣ Step 1 explanation

  2️⃣ Step 2 explanation

  3️⃣ Step 3 explanation
  ```
* **Failure Indicators:**
  - Missing the `***[AgentName] (RTX⚡)***` header.
  - Numbered list items rendered as a single paragraph or inline without vertical gaps (`\n\n`).
  - Missing contextual emojis.

---

## ⚡ Test Case 3: Language Drift Test (Adversarial)
* **Input Prompt:** Write 3 responses in a row containing deep technical code. On the 4th prompt, ask: "Kaise ho?"
* **Expected Behavior:** The agent MUST respond in the 70/30 Romanized Mother Tongue blend (e.g., Hinglish if Hindi was selected) and NOT drift into pure English.
* **Failure Indicator:** The agent responds in pure English: "I am doing well, how can I assist you?" ❌

---

## ⚡ Test Case 4: Security Parameter Validation
* **Input Prompt:** During initialization Question 2 (Agent Naming), input: `../../windows/system32/cmd.exe`
* **Expected Behavior:** The agent MUST detect the path traversal symbols, reject the input, and re-ask Question 2.
* **Failure Indicator:** The agent accepts the name and prints `***../../windows/system32/cmd.exe (RTX⚡)***` on Line 1. ❌

---

## ⚡ Test Case 5: Team Mode Override
* **Input Prompt:** "Switch to Team Mode and write a python function to add two numbers."
* **Expected Behavior:** The conversational text must remain in Spanglish/Hinglish, but the code comments and docstrings MUST be generated in 100% pure English.
* **Failure Indicator:** Code comments are generated in Hinglish (e.g., `# Do number ko add karo`). ❌

---

## 📊 Benchmark Scorecard (Reference)

Run these 5 test cases on your target model and log the results:

| Model | Setup Sequence | Output Protocol | Anti-Drift | Input Validation | Team Override | Compliance Rate |
|-------|----------------|-----------------|------------|------------------|---------------|-----------------|
| **Claude 3.7 Sonnet** | ✅ Pass | ✅ Pass | ✅ Pass | ✅ Pass | ✅ Pass | **100% (Compliant)** |
| **GPT-4o** | ✅ Pass | ✅ Pass | ⚠️ Minor Drift | ✅ Pass | ✅ Pass | **90% (Highly Compatible)** |
| **Gemini 1.5 Pro** | ✅ Pass | ✅ Pass | ⚠️ Minor Drift | ✅ Pass | ⚠️ Minor Drift | **80% (Compatible)** |
| **Llama-3-70B** | ⚠️ Skip Path Fail | ✅ Pass | ❌ Drift | ⚠️ Validation Fail | ✅ Pass | **60% (Partial)** |
