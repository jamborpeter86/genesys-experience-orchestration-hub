---
stepsCompleted: [1, 2, 3, 4, 5, 6]
workflowType: 'prd'
lastStep: 6
---

# Product Requirements Document - Genesys Experience Orchestration Hub (MVP)

**Author:** Peti (Candidate for Principal PM - Conversational AI)
**Date:** 2025-12-21
**Project:** GenesysCCmissioncontrol (Mock Scenario: Apex Global Bank)
**Role Focus:** Conversational AI, Optimization & Insights

---

## 1. Executive Summary: The "Super-Agent" & "Supervisor-Monitor" Paradigm

This PRD defines the specifications for the **Genesys Experience Orchestration Hub**, a high-fidelity Proof-of-Concept (PoC) designed to demonstrate "Principal PM" maturity. The system envisions a **Headless, AI-Native Contact Center** for likely the most demanding vertical: **Global Banking ("Apex Global Bank")**.

The core value proposition shifts from "Call Handling" to **"Closed-Loop Experience Optimization"**. We are not just routing calls; we are orchestrating intelligence between Virtual Agents, Human Agents, and Supervisors in real-time.

**Critical Differentiator:** This MVP mocks a "Local Event Bus" to simulate sub-300ms real-time AI "pushes" (RAG suggestions, Biometric Alerts, Sentiment Nudges) without a backend database, proving that the *architecture* and *user experience* are 2026-ready.

---

## 2. Strategic Context & Problem Statement

### 2.1 The "Swivel-Chair" Crisis
Current contact center agents juggle 5-8 applications (CRM, Knowledge Base, Chat, Voice, Billing). Supervisors stare at "Wallboards" showing purely operational metrics (AHT, Queue Depth) but lack insight into *why* customers are calling or *how* effective the AI is.

### 2.2 The Genesys Opportunity (Job Alignment)
To win the Principal PM role, this MVP targets:
1.  **Unified Analytics**: Merging Virtual Agent and Human Agent data into one "Conversational Funnel".
2.  **Closed-Loop Optimization**: Turning agent feedback (rejecting an AI suggestion) into immediate model improvements.
3.  **Trustworthy AI**: Providing "Explainability" links for every RAG suggestion.

---

### 3. Mock Scenario: Apex Global Bank

**Context:** "Apex Global Bank" has just launched a new "Crypto-Native Debit Card".
**The Journey (The "Agentic Failure" Loop):**
1.  **Phase 1 (Agentic Chat):** The user engages the "ApexBot" via Mobile App. The Bot successfully answers "What are the fees?" using RAG.
2.  **Phase 2 (The Failure):** User asks "Why is my activation failing with Error 505?". The Bot has *no knowledge* of this new error. It loops twice, then triggers a **Sentiment Drop**.
3.  **Phase 3 (The Handoff):** The system detects the failure cluster and routes to a Human Agent (Alex).
**The Test:** The Dashboard must show Alex the *exact* chat history and the "Failed Intent" so Alex doesn't say "How can I help you?" but instead "I see you're getting Error 505."

---

## 4. User Personas & Requirements

### 4.1 The Agent: "Alex" (Empowerment Focus)
*   **Goal**: Wants to solve the issue without searching 5 PDFs.
*   **Need**: "Tell me who this is, and what to say, *before* I say hello."
*   **MVP Features**:
    *   **Unified Omnichannel Timeline**: Shows the *entire* failed Agentic Chat transcript (highlighting the "Stuck" point).
    *   **Context Carryover**: A "Summary Card" at the top of the chat: "User stuck on Error 505 (Bot Failed)."
    *   **Predictive Agent Assist**: "Crypto Card Activation" guide pushed to sidebar.
    *   **Accent Normalization**: (Mocked) Toggle to smooth caller audio.

### 4.2 The Supervisor: "Sarah" (Optimization Focus)
*   **Goal**: Wants to know *why* the queue is spiking.
*   **Need**: "Show me the 'Heatmap' of my floor, not a spreadsheet."
*   **MVP Features**:
    *   **Galaxy "Oculus" View**: Visual node-graph of agents colored by customer sentiment.
    *   **Intent Drift Alert**: System flags "Unrecognized Intent: 'Crypto Activation'".
    *   **RAG Fidelity Dashboard**: Live chart of "Suggestion Acceptance Rate".

### 4.3 The Platform Architect: "Winston" (Extensibility Focus)
*   **Goal**: Decoupled UI from the Telephony Provider.
*   **Need**: Headless architecture using React & WebSockets.
*   **MVP Features**:
    *   **Mock Event Bus**: Custom `EventDispatcher` simulating WebSocket "pushes".
    *   **Context Payload**: JSON objects passing "Customer Tier + Verified Status".

### 4.4 The Customer: "Alex" (The Experience)
*   **Goal**: Wants a seamless mobile experience to resolve the crypto issue.
*   **Need**: "I want to see my chat history and status without calling support."
*   **MVP Features (Demo Enablement)**:
    *   **Mobile Simulator Tab**: A dedicated view simulating the customer's mobile app interface.
    *   **Shared State**: Real-time sync with the Agent's dashboard (messages appear instantly).

---

## 5. Master Feature Set (The "Wide" Vision)

| Feature Pillar | Feature Name | Description for MVP | Success Metric |
| :--- | :--- | :--- | :--- |
| **Experience Orchestration** | **Unified Conversational Funnel** | Visual flow showing drop-off from Agentic Chat -> Human Handoff. | **Containment Rate Accuracy** |
| **Experience Orchestration** | **Context Carryover Card** | "Summary of Failure" displayed instantly to Human Agent. | **Time-to-Context (Seconds)** |
| **Experience Orchestration** | **User Mobile Simulator** | "User Tab" mirroring the exact chat history in a mobile frame. | **Demo Realism** |
| **Trustworthy AI** | **Explainability Links (XAI)** | "Why?" link on every AI suggestion pointing to source doc. | **Agent Trust Score** |
| **Security & Compliance** | **Passive Biometrics (Mock)** | "Voice Liveness" indicator on Agent screen (Green/Red). | **Fraud Deflection Rate** |
| **Optimization Loop** | **Gap Detection Engine** | Alerts when agents manually search for terms not in KB. | **Content Gap Closure Time** |
| **Agent Performance** | **Auto-ACW Summaries** | One-click "Apply Summary" to CRM field. | **ACW Reduction (Minutes)** |
| **Global Operations** | **Accent Localization** | UI toggle simulating real-time audio smoothing. | **FCR Improvement** |

---

## 6. Implementation Strategy (The Technical "How")

### 6.1 Headless Architecture
*   **Frontend**: React (Vite) + Tailwind CSS (Glassmorphic "Premium" UI).
*   **State Management**: Zustand (Global Store for active call state).
*   **Event Simulation**: A `MockSocketService` that emits timed JSON events (e.g., `INCOMING_CALL`, `INTENT_DETECTED`, `SENTIMENT_SPIKE`).

### 6.2 Data Strategy (No DB)
*   **Static Story Assets**:
    *   `apex_bank_customer.json`: The "Golden Record".
    *   `crypto_incident_logs.json`: The raw data for the Supervisor Heatmap.
    *   `rag_knowledge_base.json`: Mock snippets for the AI Sidebar.

### 6.3 UX "Wow" Factors
*   **Dark Mode Native**: Professional, high-contrast Banking UI.
*   **Micro-Animations**: Pulse effects on "Live" indicators, smooth slide-ins for AI Cards.

### 6.4 Deployment Strategy
*   **Platform**: Vercel.
*   **CI/CD**: Manual deploy for MVP or Git-connected.
*   **Configuration**: `vercel.json` for SPA rewrites.

---

## 7. Success Metrics (The "Principal PM" View)

We will measure success not just by "Building it," but by measuring:
1.  **Optimization Velocity**: How fast can a Supervisor update a prompt based on an Agent's feedback?
2.  **Explanation Coverage**: Do 100% of AI suggestions have a valid source link?
3.  **Sentiment Correlation**: Does the "Empathy Nudge" actually reduce Customer Sentiment "Red" states?

---

**Next Steps:**
1.  **Approve PRD**: Confirm "Simulated Banking Crisis" scope.
2.  **Implementation**: Scaffold React App & Build `MockSocketService`.
3.  **Walkthrough**: Record a "Day in the Life" video for the Genesys application.
