
import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../../store/useAppStore.ts';
import { Message, MessageSender } from '../../../types.ts';
import { Bot, User, Edit } from 'lucide-react';
import Card from '../../shared/Card.tsx';
import { mockSocketService } from '../../../services/mockSocketService.ts';


const SuggestUpdateModal = ({ originalText, onClose }: { originalText: string, onClose: () => void }) => {
    const [suggestion, setSuggestion] = useState("The 2026 VIP policy should reflect the 5% cashback rate approved last week. This document is still pulling the 2025 parameters.");
    const agent = useAppStore(state => state.agent);

    const handleSubmit = () => {
        if (!agent || !suggestion.trim()) return;
        mockSocketService.submitKnowledgeGap(agent.id, agent.name, originalText, suggestion);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <Card className="p-6 w-full max-w-lg animate-fade-in-down shadow-2xl border border-gray-600">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-yellow-300"><Edit /> Suggest an Update</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-400">Original Text</label>
                        <p className="text-sm bg-gray-900 p-3 rounded-md mt-1 border border-gray-700 text-gray-300 italic">"{originalText}"</p>
                    </div>
                    <div>
                        <label htmlFor="suggestion" className="text-sm font-semibold text-gray-400">Your Note / Correction</label>
                        <textarea
                            id="suggestion"
                            value={suggestion}
                            onChange={(e) => setSuggestion(e.target.value)}
                            rows={4}
                            className="w-full mt-1 bg-gray-800 border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                            placeholder="Describe the discrepancy..."
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button onClick={onClose} className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                        <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all">Submit for Review</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const MessageBubble = ({ msg, customerName }: { msg: Message, customerName?: string }) => {
    const isUser = msg.sender === MessageSender.USER;
    const isBot = msg.sender === MessageSender.BOT;

    return (
        <div className={`flex gap-3 my-4 items-start ${isUser ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg ${isUser ? 'bg-purple-600' : 'bg-blue-600'}`}>
                {isBot ? <Bot className="w-6 h-6 text-white" /> : <User className="w-6 h-6 text-white" />}
            </div>
            <div className={`w-full max-w-lg p-3 rounded-lg shadow-sm ${isUser ? 'bg-purple-600/20 border border-purple-500/30' : 'bg-gray-800 border border-gray-700'}`}>
                <p className={`font-bold text-xs mb-1 ${isUser ? 'text-purple-300' : 'text-blue-300'}`}>{isUser ? (customerName || 'Customer') : "Nova AI"}</p>
                <p className="text-gray-200 text-sm leading-relaxed">{msg.text}</p>
            </div>
        </div>
    );
};


import DocumentViewer from './DocumentViewer.tsx';

const SimulatedInteraction: React.FC = () => {
    const chatMessages = useAppStore(state => state.chatMessages);
    const customer = useAppStore(state => state.customer);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [selectedTextForUpdate, setSelectedTextForUpdate] = useState<string | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    const simMessages = chatMessages.filter(m => m.type !== 'notification');

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-full min-h-[500px]">
            {selectedTextForUpdate && (
                <SuggestUpdateModal
                    originalText={selectedTextForUpdate}
                    onClose={() => setSelectedTextForUpdate(null)}
                />
            )}

            {/* Chat Area */}
            <div className="lg:w-1/3 flex flex-col bg-gray-900/50 rounded-lg border border-gray-700/50 overflow-hidden">
                <div className="p-3 bg-gray-800/80 border-b border-gray-700 font-semibold text-sm text-gray-300 flex justify-between items-center">
                    <span>Live Simulation Chat</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full animate-pulse">Active</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {simMessages.map(msg => <MessageBubble key={msg.id} msg={msg} customerName={customer?.name} />)}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Document / Workspace Area */}
            <div className="lg:w-2/3 flex flex-col">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500/20 p-2 rounded-full">
                            <Bot className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-blue-100">Nova AI Suggestion</h4>
                            <p className="text-xs text-blue-300">I found this document relevant to the customer's query.</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-hidden">
                    <DocumentViewer onSuggestUpdate={(text) => setSelectedTextForUpdate(text)} />
                </div>
            </div>
        </div>
    );
};

export default SimulatedInteraction;