
export interface Customer {
  id: string;
  name: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'VIP';
  isVerified: boolean;
  phone: string;
  email: string;
  avatarUrl: string;
}

export interface Agent {
  id:string;
  name: string;
  avatarUrl: string;
  status: 'Available' | 'OnInteraction' | 'ACW' | 'InSimulation';
}

export enum MessageSender {
  USER = 'user',
  BOT = 'bot',
  AGENT = 'agent',
  SYSTEM = 'system',
}

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: number;
  isStuckPoint?: boolean;
  isKnowledgeGap?: boolean;
  type?: 'chat' | 'whisper' | 'notification';
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  source: string;
}

export enum Sentiment {
  POSITIVE = 'positive',
  NEUTRAL = 'neutral',
  NEGATIVE = 'negative',
}

export interface Interaction {
  customer: Customer;
  chatHistory: Message[];
  failedIntent: string;
  sentiment: Sentiment;
}

export interface IncidentLog {
  agentId: string;
  agentName: string;
  customerId: string;
  sentiment: Sentiment;
  duration: number; // in seconds
  intent: string;
}

export type View = 'agent' | 'supervisor' | 'customer';

export type Scenario = 'scenario1' | 'scenario2';

export interface LeaderboardEntry {
  agentId: string;
  agentName: string;
  avatarUrl: string;
  points: number;
}

export interface KnowledgeGap {
  id: string;
  originalText: string;
  suggestedText: string;
  agentId: string;
  agentName: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
}
