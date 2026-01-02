
import { useAppStore } from '../store/useAppStore.ts';
// FIX: Import the 'Agent' type.
import type { Customer, Agent, Message, KnowledgeBaseArticle, IncidentLog, LeaderboardEntry, KnowledgeGap } from '../types.ts';
import { MessageSender, Sentiment } from '../types.ts';

class MockSocketService {
    private timeouts: ReturnType<typeof setTimeout>[] = [];
    private eventLog: string[] = [];
    private isLoaded = false;

    // Scenario 1 Data
    private s1_customerData: Customer | null = null;
    private s1_initialChatHistory: Message[] = [];
    private s1_knowledgeBase: KnowledgeBaseArticle[] = [];
    private s1_incidentLogs: IncidentLog[] = [];

    // Scenario 2 Data
    private s2_customerData: Customer | null = null;
    private s2_leaderboard: LeaderboardEntry[] = [];
    private s2_chatHistory: Message[] = [];
    private s2_knowledgeBase: KnowledgeBaseArticle[] = [];
    private s2_agent: Agent | null = null;

    private unsubscribe: (() => void) | null = null;

    async init() {
        if (this.isLoaded) return;
        console.log("MockSocketService Initializing and loading all scenario data...");

        try {
            const [s1_customerRes, s1_chatRes, s1_kbRes, s1_logsRes, s2_customerRes, s2_leaderboardRes, s2_chatRes, s2_kbRes] = await Promise.all([
                fetch('./data/customer.json'),
                fetch('./data/chatHistory.json'),
                fetch('./data/knowledgeBase.json'),
                fetch('./data/incidentLogs.json'),
                fetch('./data/scenario2/customer.json'),
                fetch('./data/scenario2/leaderboard.json'),
                fetch('./data/scenario2/chatHistory.json'),
                fetch('./data/scenario2/knowledgeBase.json'),
            ]);
            this.s1_customerData = await s1_customerRes.json();
            this.s1_initialChatHistory = await s1_chatRes.json();
            this.s1_knowledgeBase = await s1_kbRes.json();
            this.s1_incidentLogs = await s1_logsRes.json();

            this.s2_customerData = await s2_customerRes.json();
            this.s2_leaderboard = await s2_leaderboardRes.json();
            this.s2_chatHistory = await s2_chatRes.json();
            this.s2_knowledgeBase = await s2_kbRes.json();

            this.isLoaded = true;
            console.log("All mock data loaded successfully.");
        } catch (error) {
            console.error("Failed to load mock data:", error);
        }
    }

    startScenario() {
        if (!this.isLoaded || !this.s1_customerData) {
            console.error("Scenario 1 Data not loaded. Cannot start scenario.");
            return;
        }

        this.logEvent('Scenario 1 Started');
        this.clearTimeouts();
        const { actions } = useAppStore.getState();

        this.unsubscribe = useAppStore.subscribe(
            (state, prevState) => {
                if (state.chatMessages.length === prevState.chatMessages.length) return;
                const lastMessage = state.chatMessages[state.chatMessages.length - 1];
                if (
                    lastMessage && lastMessage.sender === MessageSender.AGENT &&
                    lastMessage.text.includes("crypto assets are volatile")
                ) {
                    this.logEvent('S1: Compliance script sent. Ending interaction.');
                    this.schedule(() => {
                        useAppStore.getState().actions.setSimulationState('ended');
                        useAppStore.getState().actions.setAgentStatus('ACW');
                    }, 2500);
                    this.unsubscribe?.();
                }
            }
        );

        this.schedule(() => actions.setCustomer(this.s1_customerData as Customer), 100);
        this.schedule(() => actions.setIncidentLogs(this.s1_incidentLogs as IncidentLog[]), 100);

        // Simulating a real-time conversation by staggering the initial history interaction
        const baseDelay = 1000;
        const messageInterval = 2000;

        this.s1_initialChatHistory.slice(0, 8).forEach((msg, index) => {
            this.schedule(() => {
                actions.addMessage(msg);
            }, baseDelay + (index * messageInterval));
        });

        const totalConversationTime = baseDelay + (8 * messageInterval);

        this.schedule(() => {
            actions.setCurrentSentiment(Sentiment.NEGATIVE);
            actions.setSimulationState('handoff');
            this.logEvent('S1: SENTIMENT_DROP event, state -> handoff');
        }, totalConversationTime + 500);

        this.schedule(() => actions.addUnrecognizedIntent('Crypto Activation Error 505'), totalConversationTime + 1000);
        this.schedule(() => actions.addMessage({
            id: 'msg-handoff', sender: MessageSender.BOT,
            text: "I'm sorry I couldn't help. Connecting you to a specialist...",
            timestamp: Date.now(),
        }), totalConversationTime + 1500);

        this.schedule(() => {
            actions.setContextSummary("Customer 'Alex Smith' is getting 'Error 505' activating their new Crypto-Native Debit Card. Bot failed to assist. Sentiment is negative.");
            actions.setAiSuggestions(this.s1_knowledgeBase as KnowledgeBaseArticle[]);
            actions.setSimulationState('agent_chat');
            actions.setAgentStatus('OnInteraction');
            this.logEvent('S1: INCOMING_INTERACTION event for Agent.');
        }, totalConversationTime + 3000);
    }

    startScenario2() {
        if (!this.isLoaded || !this.s2_customerData) {
            console.error("Scenario 2 Data not loaded. Cannot start scenario.");
            return;
        }
        const { actions } = useAppStore.getState();

        this.logEvent('Scenario 2 Started');
        this.clearTimeouts();

        actions.setAgentStatus('InSimulation');

        this.schedule(() => actions.addMessage({
            id: 's2-notify-1', sender: MessageSender.SYSTEM, type: 'notification',
            text: "Downtime Detected. Ready to pilot the 'Q1 2026 Loyalty Launch' simulation? Earn double XP and a 'Early Bird 2026' badge!",
            timestamp: Date.now(),
        }), 500);

        this.schedule(() => {
            actions.setCustomer(this.s2_customerData as Customer);
            actions.setLeaderboard(this.s2_leaderboard as LeaderboardEntry[]);
            actions.setAiSuggestions(this.s2_knowledgeBase as KnowledgeBaseArticle[]);
            this.logEvent('S2: Training environment loaded.');
        }, 1500);

        this.schedule(() => actions.addMessage(this.s2_chatHistory[0]), 3000); // Jordan asks question
        this.schedule(() => actions.addMessage(this.s2_chatHistory[1]), 5000); // Nova provides incorrect answer
    }

    submitKnowledgeGap(agentId: string, agentName: string, originalText: string, suggestedText: string) {
        this.logEvent(`S2: Knowledge Gap submitted by ${agentName}`);
        const { actions } = useAppStore.getState();
        const gap: KnowledgeGap = {
            id: `gap-${Date.now()}`,
            agentId, agentName, originalText, suggestedText,
            status: 'pending', timestamp: Date.now(),
        };
        actions.addKnowledgeGap(gap);

        actions.addMessage({
            id: 's2-notify-2', sender: MessageSender.SYSTEM, type: 'notification',
            text: "Great eye, Alex! Knowledge Gap identified. +150 Points. Your suggestion is being fast-tracked for Sarah’s review.",
            timestamp: Date.now(),
        });
        actions.updateLeaderboardPoints(agentId, 150);
    }

    approveKnowledgeGap(gap: KnowledgeGap) {
        this.logEvent(`S2: Knowledge Gap ${gap.id} approved by Sarah.`);
        const { actions } = useAppStore.getState();
        actions.resolveKnowledgeGap(gap.id);

        this.schedule(() => {
            actions.addMessage({
                id: 's2-notify-3', sender: MessageSender.SYSTEM, type: 'notification',
                text: "Critical Thinker Bonus! Your feedback helped update the 2026 Global KB. You’ve earned 100 'Marketplace Credits' for the company store!",
                timestamp: Date.now(),
            });
            actions.updateLeaderboardPoints(gap.agentId, 250); // 100 bonus + 150 for completion
        }, 1000);
    }


    sendSupervisorWhisper(text: string) {
        if (!text.trim()) return;
        const { actions } = useAppStore.getState();
        const whisper: Message = {
            id: `msg-whisper-${Date.now()}`, sender: MessageSender.SYSTEM,
            text, timestamp: Date.now(), type: 'whisper'
        };
        actions.addMessage(whisper);
    }

    generateACW() {
        this.logEvent('S1: Agent requested ACW Summary.');
        const { actions } = useAppStore.getState();
        actions.setSimulationState('acw');
        this.schedule(() => actions.setInteractionSummary("Customer attempted to activate Crypto Staking, encountered Error 505. Agent provided compliance disclaimer and guided user through troubleshooting..."), 1000);
        this.schedule(() => actions.setInteractionScore({ compliance: 100, quality: 94 }), 1500);
    }

    stopScenario() {
        this.logEvent('Scenario Stopped');
        this.clearTimeouts();
        this.unsubscribe?.();
    }

    cleanup() {
        this.clearTimeouts();
        this.unsubscribe?.();
    }

    private schedule(callback: () => void, delay: number) {
        const timeout = setTimeout(callback, delay);
        this.timeouts.push(timeout);
    }

    private clearTimeouts() {
        this.timeouts.forEach(clearTimeout);
        this.timeouts = [];
    }

    private logEvent(event: string) {
        const timestamp = new Date().toISOString();
        console.log(`[MockSocket] ${timestamp}: ${event}`);
        this.eventLog.push(`${timestamp}: ${event}`);
    }
}

export const mockSocketService = new MockSocketService();