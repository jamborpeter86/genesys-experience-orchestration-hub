
import React from 'react';
import { useAppStore } from '../../store/useAppStore.ts';
import { MessageSender } from '../../types.ts';
import { Send, Sparkles } from 'lucide-react';

const AgentChatInput: React.FC = () => {
    const { agentInputText, aiSuggestions, actions } = useAppStore();
    const { setAgentInputText, addMessage } = actions;

    const handleSend = () => {
        if (agentInputText.trim() === '') return;

        const newMessage = {
            id: `msg-agent-${Date.now()}`,
            sender: MessageSender.AGENT,
            text: agentInputText,
            timestamp: Date.now(),
        };
        addMessage(newMessage);
        setAgentInputText('');
    };

    const handleGenerateResponse = () => {
        if (aiSuggestions.length === 0) return;

        // Simple heuristic to pick the best response based on active suggestions
        const error505Suggestion = aiSuggestions.find(s => s.title.includes('Error 505'));
        const disclaimerSuggestion = aiSuggestions.find(s => s.title.includes('Disclaimer'));

        if (error505Suggestion) {
            setAgentInputText("I see you're encountering Error 505. This is typically caused by a time sync issue on your device. Could you please check your Date & Time settings and ensure 'Set time automatically' is enabled?");
        } else if (disclaimerSuggestion) {
            setAgentInputText("Before we proceed, please be aware that crypto assets are volatile and not covered by traditional deposit insurance. Do you wish to proceed?");
        } else {
            // Fallback to the content of the first suggestion if no specific match
            setAgentInputText(aiSuggestions[0].content);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-gray-700 pt-4 mt-4 flex-shrink-0">
            <div className="relative">
                <textarea
                    value={agentInputText}
                    onChange={(e) => setAgentInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 pr-24 text-sm text-gray-200 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Type your message or apply a script..."
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2">
                    <button
                        onClick={handleGenerateResponse}
                        className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors disabled:bg-gray-600 disabled:opacity-50"
                        disabled={aiSuggestions.length === 0}
                        title="Generate AI Response"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleSend}
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors disabled:bg-gray-600"
                        disabled={!agentInputText.trim()}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgentChatInput;
