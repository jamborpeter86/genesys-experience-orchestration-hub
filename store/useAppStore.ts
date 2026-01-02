
import { create } from 'zustand';
import type { Customer, Agent, Message, KnowledgeBaseArticle, IncidentLog, View, Scenario, LeaderboardEntry, KnowledgeGap } from '../types.ts';
import { Sentiment } from '../types.ts';

type SimulationState = 'idle' | 'bot_chat' | 'handoff' | 'agent_chat' | 'ended' | 'acw' | 'training_sim';

interface AppState {
  simulationState: SimulationState;
  activeView: View;
  activeScenario: Scenario | null;
  customer: Customer | null;
  agent: Agent | null;
  chatMessages: Message[];
  aiSuggestions: KnowledgeBaseArticle[];
  contextSummary: string | null;
  currentSentiment: Sentiment;
  agentInputText: string;
  interactionSummary: string | null;
  interactionScore: { compliance: number; quality: number } | null;
  supervisorMetrics: {
    incidentLogs: IncidentLog[];
    ragAcceptanceRate: number; // percentage
    unrecognizedIntents: string[];
    knowledgeGaps: KnowledgeGap[];
  };
  scenario2: {
    leaderboard: LeaderboardEntry[];
  }
  actions: {
    startSimulation: (scenario: Scenario) => void;
    resetSimulation: () => void;
    setCustomer: (customer: Customer) => void;
    setAgent: (agent: Agent) => void;
    addMessage: (message: Message) => void;
    addBulkMessages: (messages: Message[]) => void;
    setContextSummary: (summary: string) => void;
    setAiSuggestions: (suggestions: KnowledgeBaseArticle[]) => void;
    setCurrentSentiment: (sentiment: Sentiment) => void;
    setSimulationState: (state: SimulationState) => void;
    setAgentInputText: (text: string) => void;
    setInteractionSummary: (summary: string | null) => void;
    setInteractionScore: (score: { compliance: number; quality: number } | null) => void;
    setIncidentLogs: (logs: IncidentLog[]) => void;
    addUnrecognizedIntent: (intent: string) => void;
    updateRagAcceptance: (rate: number) => void;
    setAgentStatus: (status: Agent['status']) => void;
    setActiveView: (view: View) => void;
    setActiveScenario: (scenario: Scenario) => void;
    setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
    addKnowledgeGap: (gap: KnowledgeGap) => void;
    updateLeaderboardPoints: (agentId: string, points: number) => void;
    resolveKnowledgeGap: (gapId: string) => void;
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  simulationState: 'idle',
  activeView: 'customer',
  activeScenario: null,
  customer: null,
  agent: { id: 'alex', name: 'Alex', avatarUrl: 'https://i.pravatar.cc/150?u=alex', status: 'Available' },
  chatMessages: [],
  aiSuggestions: [],
  contextSummary: null,
  currentSentiment: Sentiment.NEUTRAL,
  agentInputText: '',
  interactionSummary: null,
  interactionScore: null,
  supervisorMetrics: {
    incidentLogs: [],
    ragAcceptanceRate: 92,
    unrecognizedIntents: [],
    knowledgeGaps: [],
  },
  scenario2: {
    leaderboard: [],
  },
  actions: {
    startSimulation: (scenario) => {
      set({
        activeScenario: scenario,
        simulationState: scenario === 'scenario1' ? 'bot_chat' : 'training_sim',
        activeView: scenario === 'scenario2' ? 'agent' : 'customer'
      });
    },
    resetSimulation: () => {
      const agent = get().agent;
      set({
        simulationState: 'idle',
        activeScenario: null,
        customer: null,
        chatMessages: [],
        aiSuggestions: [],
        contextSummary: null,
        currentSentiment: Sentiment.NEUTRAL,
        agentInputText: '',
        interactionSummary: null,
        interactionScore: null,
        supervisorMetrics: {
          incidentLogs: get().supervisorMetrics.incidentLogs,
          ragAcceptanceRate: 92,
          unrecognizedIntents: [],
          knowledgeGaps: [],
        },
        scenario2: {
          leaderboard: [],
        },
        agent: agent ? { ...agent, status: 'Available' } : null,
      });
    },
    setCustomer: (customer) => set({ customer }),
    setAgent: (agent) => set({ agent }),
    addMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
    addBulkMessages: (messages) => set((state) => ({ chatMessages: [...state.chatMessages, ...messages] })),
    setContextSummary: (summary) => set({ contextSummary: summary }),
    setAiSuggestions: (suggestions) => set({ aiSuggestions: suggestions }),
    setCurrentSentiment: (sentiment) => set({ currentSentiment: sentiment }),
    setSimulationState: (state) => set({ simulationState: state }),
    setAgentInputText: (text) => set({ agentInputText: text }),
    setInteractionSummary: (summary) => set({ interactionSummary: summary }),
    setInteractionScore: (score) => set({ interactionScore: score }),
    setIncidentLogs: (logs) => set((state) => ({ supervisorMetrics: { ...state.supervisorMetrics, incidentLogs: logs } })),
    addUnrecognizedIntent: (intent) => set((state) => ({ supervisorMetrics: { ...state.supervisorMetrics, unrecognizedIntents: [...state.supervisorMetrics.unrecognizedIntents, intent] } })),
    updateRagAcceptance: (rate) => set((state) => ({ supervisorMetrics: { ...state.supervisorMetrics, ragAcceptanceRate: rate } })),
    setAgentStatus: (status) => set((state) => ({
      agent: state.agent ? { ...state.agent, status } : state.agent
    })),
    setActiveView: (view) => set({ activeView: view }),
    setActiveScenario: (scenario) => set({ activeScenario: scenario }),
    setLeaderboard: (leaderboard) => set((state) => ({ scenario2: { ...state.scenario2, leaderboard } })),
    addKnowledgeGap: (gap) => set((state) => ({ supervisorMetrics: { ...state.supervisorMetrics, knowledgeGaps: [...state.supervisorMetrics.knowledgeGaps, gap] } })),
    updateLeaderboardPoints: (agentId, points) => set((state) => ({
      scenario2: {
        ...state.scenario2,
        leaderboard: state.scenario2.leaderboard.map(entry =>
          entry.agentId === agentId ? { ...entry, points: entry.points + points } : entry
        ).sort((a, b) => b.points - a.points),
      }
    })),
    resolveKnowledgeGap: (gapId) => set((state) => ({
      supervisorMetrics: {
        ...state.supervisorMetrics,
        knowledgeGaps: state.supervisorMetrics.knowledgeGaps.map(gap =>
          gap.id === gapId ? { ...gap, status: 'approved' } : gap
        ),
      }
    })),
  },
}));
