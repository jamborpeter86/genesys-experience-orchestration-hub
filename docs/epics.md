---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: ["_bmad-output/planning/prd-GenesysCCmissioncontrol-2025-12-21.md"]
---

# GenesysCCmissioncontrol - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for GenesysCCmissioncontrol, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: **Unified Conversational Funnel** - System must display a visual flow showing user drop-off from Agentic Chat to Human Handoff.
FR2: **Context Carryover Card** - System must display a "Summary of Failure" card instantly to the Human Agent upon handoff, showing the specific failure point (e.g., "Error 505"). **Constraint:** Must be "Sticky" at the top of the Center Panel (high Z-index).
FR3: **Unified Omnichannel Timeline** - System must show the *entire* failed Agentic Chat transcript to the Human Agent without repetition.
FR4: **Predictive Agent Assist** - System must push relevant guide content (e.g., "Crypto Card Activation") to the agent's sidebar based on current context.
FR5: **Accent Normalization Toggle** -  System must provide a UI toggle for agents to simulate real-time audio smoothing.
FR6: **Galaxy "Oculus" View** - System must display a node-graph heatmap of all agents, colored by customer sentiment, for the Supervisor.
FR7: **Intent Drift Alert** - System must automatically flag and alert supervisors of "Unrecognized Intents" (e.g., "Crypto Activation") not covered in the KB.
FR8: **RAG Fidelity Dashboard** - System must display a real-time chart of "Suggestion Acceptance Rate" for Supervisors.
FR9: **Explainability Links** - System must provide a "Why?" link on every AI suggestion pointing to the source knowledge document.
FR10: **Passive Biometrics Mock** - System must display a "Voice Liveness" indicator (Green/Red) on the Agent screen.
FR11: **Gap Detection Engine** - System must alert Supervisors when agents manually search for terms not found in the Knowledge Base.
FR12: **Auto-ACW Summaries** - System must allow agents to "Apply Summary" to a CRM field with one click.
FR13: **Agent Workspace Layout** - System must utilize a fixed "3-Column Cockpit" layout:
    - **Left (25%)**: The Thread (Omnichannel view).
    - **Center (50%)**: The Work (Interaction/Script).
    - **Right (25%)**: The Brain (AI Sidebar - collapsible but visually permanent).
FR14: **Supervisor Dashboard Layout** - System must provide a broad "Galaxy View" (monitoring) that transitions to a "Focus Mode" sidebar when a specific agent is selected.

### NonFunctional Requirements

NFR1: **Performance** - Real-time AI "pushes" (alerts, suggestions) must be simulated with sub-300ms latency.
NFR2: **Architecture** - Must use a **Headless Architecture** decoupling UI from backend logic.
NFR3: **Data constraint** - Must operate **without a backend database**, utilizing static JSON mock data.
NFR4: **UX/Aesthetics** - Must use **"Holo-Dark" Mode** styling (Deep slate backgrounds) with **Neon Accent Borders** (Green=Safe, Red=Compliance Risk) and Glassmorphism.
NFR5: **Privacy** - Accent Normalization must be implemented as a privacy-first simulation (UI-only for MVP).
NFR6: **Responsiveness** - Application must be **Mobile-Responsive**, utilizing "Adaptive Density": **Hide Galaxy Graph** on Mobile and switch to Priority List view.

### Additional Requirements

- **Tech Stack**: React (Vite) + Tailwind CSS (using **CSS Grid** for main 3-col layouts).
- **State Management**: Zustand (Global Store for active call state).
- **Simulation Service**: Implement a `MockSocketService` that emits timed JSON events (e.g., `INCOMING_CALL`, `INTENT_DETECTED`, `SENTIMENT_SPIKE`).
- **Data Assets**:
    - `apex_bank_customer.json`: The "Golden Record".
    - `crypto_incident_logs.json`: The raw data for the Supervisor Heatmap.
    - `rag_knowledge_base.json`: Mock snippets for the AI Sidebar.

### FR Coverage Map

FR1: Epic 1 - Agent sees the funnel dropping off at "Error 505".
FR2: Epic 1 - "Summary Card" displayed at top of chat.
FR3: Epic 1 - Full transcript history visible.
FR4: Epic 1 - RAG Suggestion sidebar pushes "Crypto" guide.
FR5: Epic 1 - Accent Normalization toggle in UI.
FR6: Epic 2 - "Galaxy View" component for monitoring.
FR7: Epic 2 - Alerts for "Unrecognized Intent".
FR8: Epic 2 - Real-time "Suggestion Acceptance" chart.
FR9: Epic 1 - "Why?" link on RAG suggestions.
FR10: Epic 1 - "Voice Liveness" mock indicator.
FR11: Epic 2 - "Content Gap" alert when manual search happens.
FR12: Epic 1 - "Apply Summary" button in ACW.
FR13: Epic 1 - 3-Column Cockpit Layout implementation.
FR14: Epic 2 - Galaxy View & Mobile Priority List logic.

## Epic List

### Epic 1: The "Super-Agent" Cockpit (Efficiency & Empathy)
**Goal:** Empower agents to handle high-stress banking failure scenarios without manual searching or context switching.
**User Outcome:** Agents resolve "Crypto Staking" errors in <3 minutes using proactive AI guidance and full context visibility.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR9, FR10, FR12, FR13

### Story 1.1: 3-Column Workspace Layout
As a Human Agent, I want a fixed 3-column workspace with sticky panels, So that I can manage the interaction without losing context of the customer journey or AI suggestions.

**Acceptance Criteria:**
**Given** I log into the agent dashboard
**When** the page loads
**Then** I see three distinct columns: Left (25%), Center (50%), Right (25%) using CSS Grid
**And** the Center Panel has a scrollable area for chat/script
**And** the Right Panel (AI Sidebar) is collapsible but defaults to open

### Story 1.2: Agentic Chat Failure Card (Sticky)
As a Human Agent, I want to see a sticky "Failure Summary" card at the top of my center panel, So that I immediately know why the bot failed before I even say hello.

**Acceptance Criteria:**
**Given** an incoming call interaction from the "Crypto Staking" bot flow
**When** the handoff occurs
**Then** a card appears pinned to the top of the Center Column (z-index 50)
**And** it displays the error code "505" and the last user intent "Activate Crypto Staking"
**And** it persists even if I scroll down the chat transcript

### Story 1.3: Unified Omnichannel Timeline
As a Human Agent, I want to see the full transcript of the failed bot conversation, So that I don't ask the customer to repeat themselves.

**Acceptance Criteria:**
**Given** the "Failure Summary" card is visible
**When** I look below it in the Center Column
**Then** I see the full message history (User vs. Bot)
**And** the last user message is "Why can't I activate my Crypto Staking?"
**And** the messages are efficiently clearly distinguished (e.g., distinct background colors)

### Story 1.4: Predictive RAG Suggestions
As a Human Agent, I want valid knowledge articles pushed to my sidebar automatically, So that I can solve the "Crypto" issue without searching.

**Acceptance Criteria:**
**Given** the context is "Crypto Staking"
**When** I view the Right Sidebar
**Then** I see the top suggestion "KB-99: High Risk Asset Disclaimer"
**And** clicking it expands the content without leaving the page
**And** I see a "Why?" link explaining the AI's confidence

### Story 1.5: Passive Biometrics Indicator
As a Human Agent, I want to see a passive trust indicator for the caller's voice, So that I feel safe proceeding with high-value transactions.

**Acceptance Criteria:**
**Given** an active voice interaction
**When** I look at the customer header in the Left Column
**Then** I see a "Voice Liveness" icon (Green Shield)
**And** it pulses to indicate active analysis (Mock Simulation)

### Story 1.6: Accent Normalization Toggle
As a Human Agent, I want a toggle to smooth out difficult audio, So that I can understand international customers clearly.

**Acceptance Criteria:**
**Given** I am in an active call
**When** I click the "Normalize Audio" toggle in the header
**Then** the UI state changes to "Active" (Visual feedback only for MVP)
**And** a toast notification confirms "Accent Normalization Enabled"

### Story 1.7: User Mobile Simulator
As a Demo Viewer, I want to see the exact mobile interface the customer is using, So that I can understand the "omnichannel" nature of the experience.

**Acceptance Criteria:**
**Given** I am on the main dashboard
**When** I click the "User" tab in the header
**Then** I see a realistic "Mobile Phone" frame
**And** it displays the exact same chat history as the Agent view (Synced State)
**And** it shows the "Authentication Verified" status

### Epic 2: The "Oculus" Supervisor Hub (Insights & Optimization)
**Goal:** Enable supervisors to visualize "Floor Sentiment" and detect "Intent Drift" in real-time to close content gaps.
**User Outcome:** Supervisors identify the "Crypto" content gap within 10 minutes of the spike and can view the exact failure points.
**FRs covered:** FR6, FR7, FR8, FR11, FR14, NFR6 (Responsiveness)

### Story 2.1: Galaxy Heatmap (Desktop)
As a Supervisor, I want to see a node-graph heatmap of all active agents, So that I can visually identify "hotspots" of negative sentiment instantly.

**Acceptance Criteria:**
**Given** I am on the Supervisor Monitor page on a Desktop (width > 1024px)
**When** the page loads
**Then** I see the "Galaxy Graph" component
**And** nodes are colored by sentiment (Green=Good, Red=Bad)
**And** hovering a node shows the Agent Name and current Intent

### Story 2.2: Adaptive Priority List (Mobile)
As a Supervisor, I want to see a prioritized list of alarming calls on my phone, So that I can monitor the floor while walking around.

**Acceptance Criteria:**
**Given** I am viewing the Monitor page on Mobile (width < 768px)
**When** the page loads
**Then** the "Galaxy Graph" is HIDDEN
**And** I see a "Priority List" sorted by Negative Sentiment score descending
**And** the layout is optimized for touch (large tap targets)

### Story 2.3: Intent Drift Alerts
As a Supervisor, I want to be alerted when a new intent spikes that isn't in our Knowledge Base, So that I can react to emerging crises like "Crypto Staking".

**Acceptance Criteria:**
**Given** specific intents (e.g., "activate crypto staking") exceed a threshold (e.g., 5 calls in 1 minute)
**When** I am on the Dashboard
**Then** a "Drift Alert" banner appears at the top
**And** clicking it filters the view to show only those specific calls

### Story 2.4: RAG Fidelity Chart
As a Supervisor, I want to see how often agents are accepting AI suggestions, So that I know if our knowledge base is actually useful.

**Acceptance Criteria:**
**Given** agents are clicking "Apply" or "Reject" on sidebar suggestions
**When** I view the "Optimization" tab
**Then** I see a real-time line chart of "Acceptance Rate" over the last hour
**And** I can drill down to see which specific articles are being rejected

### Epic 3: Headless Experience Architecture (Foundation)
**Goal:** Establish the technical "Plumbing" that enables sub-300ms event simulation and decoupled UI.
**User Outcome:** Developers can iterate on the UI independently of the telephony backend; Users feel a "Real-Time" snappy experience.
**FRs covered:** NFR1, NFR2, NFR3, NFR4, NFR5

### Story 3.1: Headless React Scaffold
As a Developer, I want a clean React + Vite architecture with Tailwind configured, So that I can build the Glassmorphic UI components without fighting legacy CSS.

**Acceptance Criteria:**
**Given** a fresh repository
**When** I run `npm run dev`
**Then** I see a "Hello World" page styled with the "Holo-Dark" slate background
**And** correct fonts (Inter/Roboto) are loaded
**And** the project structure separates /components, /store, and /services

### Story 3.2: MockSocketService
As a Developer, I want a service that simulates a WebSocket connection, So that the UI receives "Real-Time" events without a real backend.

**Acceptance Criteria:**
**Given** the application is running
**When** the `MockSocketService` is initialized
**Then** it emits an `INCOMING_CALL` event after 5 seconds
**And** the UI subscribes to this event and logs it to the console
**And** latency is simulated (random jitter between 100ms-300ms)

### Story 3.3: Global State Store (Zustand)
As a Developer, I want a global store to manage the "Active Call" state, So that the 3-column layout stays in sync (e.g., Timeline updates when Call connects).

**Acceptance Criteria:**
**Given** `MockSocketService` emits an event
**When** the event is received
**Then** the Zustand store updates the `activeInteraction` object
**And** any component subscribing to `useStore()` re-renders automatically

### Story 3.4: Static JSON Data Mocking
As a Developer, I want to load customer data from a static JSON file, So that I can simulate a "Cloud Database" lookup without a server.

**Acceptance Criteria:**
**Given** the `INCOMING_CALL` event has a `customerId`
**When** the store processes the call
**Then** it successfully retrieves the matching record from `apex_bank_customer.json`
**And** populates the "Customer Header" in the Left Column

### Story 3.5: Vercel Deployment Configuration
As a Developer, I want the project configured for Vercel, So that I can deploy the application to a public URL for review.

**Acceptance Criteria:**
**Given** the code is pushed to the repository
**When** I connect it to Vercel
**Then** the build succeeds using `npm run build`
**And** the deployed URL loads the application correctly
**And** no server-side routing errors occur (Single Page App rewrite rules configured if necessary)
