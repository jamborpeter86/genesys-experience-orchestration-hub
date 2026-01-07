# 🎭 Genesys Mission Control: Interview Demo Script

**Objective:** Demonstrate an end-to-end "High Risk" customer support journey, showcasing the seamless interplay between **Agent Efficiency**, **AI Compliance**, and **Supervisor Oversight**.

---

## 📖 The Narrative Arc
1.  **The Trigger**: A customer asks about a sensitive topic ("Crypto").
2.  **The Compliance Guard**: The system detects risk and provides the Agent with a "Magic Script".
3.  **The Agent Action**: The Agent applies the script instantly (no typing).
4.  **The Supervisor Oversight**: The Supervisor sees the interaction, verifies the "Knowledge Gap" is closed, and sends a "Whisper" of encouragement.
5.  **The Automation Outcome**: The system auto-summarizes and scores the interaction perfectly.

---

## 🎬 Act 1: The Agent Cockpit (Efficiency & Compliance)

> **Role:** You start as the **Agent (Sarah)**.

1.  **Open the App**: Navigate to `http://localhost:5173`.
    *   *Visual*: The "Mission Control" dashboard.
2.  **The Trigger**:
    *   Look at the **Interaction Panel** (Center).
    *   Notice the customer (Alex) asks: *"Why can't I activate my Crypto Staking?"*
3.  **The Risk Alert**:
    *   Point to the **Failure Card** (Top Center, Red).
    *   *Narrative*: "The system automatically detects a **Compliance Risk** (Error 505). I cannot proceed without a disclaimer."
4.  **The Solution (RAG Panel)**:
    *   Look at the **Agent Assist / RAG Panel** (Right).
    *   The AI has already retrieved the "High Risk Asset Disclaimer".
    *   *Action*: Click the **"Apply Script"** button (Sparkles icon).
5.  **The Magic Moment**:
    *   *Watch*: The text **auto-types** into your Chat Input at the bottom.
    *   *Narrative*: "As an agent, I don't need to type legalese. One click ensures 100% compliance."

---

## 🎬 Act 2: The Supervisor Hub (Oversight & Coaching)

> **Role:** You switch hats to the **Supervisor (Commander Riker)**.

*Technically: Imagine opening a second tab or just scrolling to the Supervisor section if it's a single page (currently separate layouts, maybe show screenshots or toggle if possible? Alternatively, describe the "Supervisor View" feature).*

1.  **The Monitoring**:
    *   *Narrative*: "Meanwhile, the Supervisor is watching the **Command Triad** dashboard."
2.  **The Knowledge Gap**:
    *   Point to the **Intent Drift Analysis** (Center).
    *   *Narrative*: "I can see the team is trending towards 'Account Closures'. But wait..."
    *   Point to **Knowledge Gaps** (Right).
    *   *Narrative*: "The system flagged 'Crypto Staking Rules' as a missing knowledge piece yesterday. Today, I see Sarah using the new script."
3.  **The Coaching (Whisper)**:
    *   Go to **Whisper Control** (Top Left).
    *   *Action*: Type: *"Great job handling that risk disclaimer!"*
    *   *Action*: Click **Send Whisper**.
    *   *Narrative*: "I can coach Sarah in real-time without interrupting the customer."

---

## 🎬 Act 3: The Resolution (Automation)

> **Role:** Back to **Agent (Sarah)**.

1.  **The Receive**:
    *   Look at the **Timeline** (Center).
    *   See the **Whisper** appear (in Yellow/Action color): *"Great job handling that risk disclaimer!"*
2.  **The Wrap Up**:
    *   *Action*: Click **"Generate Summary"** (Bottom Footer, Auto-ACW).
3.  **The Result**:
    *   *Watch*: The summary generates: *"Customer attempted to activate Crypto Staking... Validated via Voice Liveness."*
    *   *Watch*: The **Interaction Scorecard** appears below it.
    *   *Highlight*: **100% Compliance**, **94/100 Quality Score**.
    *   *Narrative*: "The interaction is documented and scored automatically. No manual data entry."

---

## 🛠️ Prep Instructions
Before the interview:
1.  Run `npm run dev`.
2.  Open the browser to the main page.
3.  Ensure the "Apply Script" button works (click it once to test, then reload to clear).
4.  (Optional) Have a second tab open with the Supervisor Dashboard if you want to switch views (requires routing setup or just explaining it).

---

## 🗣️ Key Talking Points for Interview
*   **"Agent Autonomy vs. Control"**: "We built 'Magic Apply' to empower agents, not replace them. They still control the 'Send' button."
*   **"System 2 Thinking"**: "The AI handles the 'System 2' complex lookup (Compliance Rules), letting the Agent focus on 'System 1' empathy."
*   **"Closed Loop"**: "Supervisor spots a gap -> AI suggests a script -> Agent applies it -> System scores it. It's a self-improving loop."
