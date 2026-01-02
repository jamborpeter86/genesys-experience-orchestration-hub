# User Guide: Scenario 1 - Live Experience Orchestration

This scenario demonstrates a seamless handoff from an AI bot to a human agent, enriched with real-time context and supervisor oversight. It showcases how Genesys Experience Orchestration Hub handles complex customer journeys.

---

## Phase 1: Start the Simulation

1.  Navigate to the **Home Dashboard**.
2.  Locate the card for **"Scenario 1: Live Experience Orchestration"**.
3.  Click the **"Start Scenario 1"** button.

![Start Scenario 1](/Users/peti/.gemini/antigravity/brain/a73ec217-c961-4d79-a696-fc1284601697/scenario1_start_1767353438220.png)

---

## Phase 2: Customer Experience (Mobile Simulation)

Experience the interaction from the customer's perspective.

1.  **View Customer Panel**: After starting, you are taken to the **Customer** view.
2.  **Bot Interaction**: Observe the simulated chat where the customer ("Sarah") initially interacts with "ApexBot".
3.  **Escalation**: The bot detects frustration or complexity and initiates a handoff.
4.  **Status**: The status indicator will change to **"Bot is handing off to a human agent"** and then **"Customer is now connected with a human agent"**.

![Customer View](/Users/peti/.gemini/antigravity/brain/a73ec217-c961-4d79-a696-fc1284601697/scenario1_customer_1767353448087.png)

---

## Phase 3: Agent Interaction (Context & Assist)

Switch roles to see how the agent handles the handed-off interaction.

1.  **Switch View**: In the left sidebar, click on **"Agent"**.
2.  **Unified Timeline**: Review the chat history, which includes the entire bot conversation. No need to ask the customer to repeat themselves!
3.  **Customer Profile**: See **Sarah's** details, including her **Platinum Tier** status and **Frustrated** sentiment.
4.  **Agent Assist**: Notice the AI suggestions in the right panel appropriately guiding the agent based on the context.
5.  **Security**: Verify the **Voice Match Verified** status in the security card.

![Agent View](/Users/peti/.gemini/antigravity/brain/a73ec217-c961-4d79-a696-fc1284601697/scenario1_agent_1767353459419.png)

---

## Phase 4: AI Assistance & Resolution

See how Agent Assist drives compliance and efficiency.

1.  **AI Suggestion**: The system detects a high-risk topic (Crypto) and suggests a compliance disclaimer.
2.  **Apply Suggestion**: Click the **Apply** button (sparkle icon) on the "High Risk Asset Disclaimer" card.

![AI Suggestion](/Users/peti/.gemini/antigravity/brain/a73ec217-c961-4d79-a696-fc1284601697/scenario1_ai_suggestion_1767354159039.png)

3.  **Auto-Response**: The text is automatically pasted into the chat input. Click **Send** (or press Enter) to send it to the customer.

![Auto Response](/Users/peti/.gemini/antigravity/brain/a73ec217-c961-4d79-a696-fc1284601697/scenario1_auto_response_1767354215139.png)

4.  **Wrap Up**: Once the interaction concludes, a **"Generate Summary (Auto-ACW)"** button appears. Click it to finalize the session.

![Auto ACW](/Users/peti/.gemini/antigravity/brain/a73ec217-c961-4d79-a696-fc1284601697/scenario1_auto_acw_1767354241150.png)

5.  **Scorecard**: The AI instantly generates an **Interaction Summary** and calculates a **Compliance Score** (100%) and **Quality Score**.

![Scorecard](/Users/peti/.gemini/antigravity/brain/a73ec217-c961-4d79-a696-fc1284601697/scenario1_scorecard_1767354278392.png)

---

## Phase 5: Supervisor Oversight (Real-time Monitoring)

Finally, see how a supervisor monitors the floor.

1.  **Switch View**: In the left sidebar, click on **"Supervisor"**.
2.  **Galaxy View**: Observe the "Oculus" heatmap showing agent statuses and sentiment across the floor.
3.  **Real-time Alerts**: Check the **"Intent Drift Alerts"** for any emerging trends or issues requiring attention.
4.  **RAG Fidelity**: Monitor how often agents are accepting AI suggestions using the fidelity chart.

![Supervisor View](/Users/peti/.gemini/antigravity/brain/a73ec217-c961-4d79-a696-fc1284601697/scenario1_supervisor_1767353492160.png)

---

**Summary**: You have successfully explored the Live Experience Orchestration, seeing the journey from Customer, Agent, and Supervisor perspectives!
