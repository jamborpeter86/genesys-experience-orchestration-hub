
import React from 'react';
import Leaderboard from './Leaderboard.tsx';
import SimulatedInteraction from './SimulatedInteraction.tsx';
import Card from '../../shared/Card.tsx';
import AgentStatus from '../AgentStatus.tsx';
import { GraduationCap, Trophy, UserCheck, Bell, X } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore.ts';
import { MessageSender } from '../../../types.ts';

const NotificationPopup = ({ message, onClose }: { message: string, onClose: () => void }) => (
    <div className="fixed top-20 right-6 bg-green-500 text-white p-4 rounded-lg shadow-xl animate-fade-in-down z-50 flex items-center gap-3">
        <Bell className="w-6 h-6 flex-shrink-0" />
        <p className="font-semibold">{message}</p>
        <button
            onClick={onClose}
            className="ml-auto bg-white/20 hover:bg-white/30 p-1 rounded-full transition-colors flex-shrink-0"
        >
            <X className="w-4 h-4" />
        </button>
    </div>
);

const AgentTrainingView: React.FC = () => {
    const agent = useAppStore(state => state.agent);
    const chatMessages = useAppStore(state => state.chatMessages);
    const [dismissedNotifications, setDismissedNotifications] = React.useState<string[]>([]);

    const notification = chatMessages.find(msg =>
        msg.type === 'notification' &&
        msg.id.startsWith('s2-notify') &&
        !dismissedNotifications.includes(msg.id)
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full relative">
            {notification && (
                <NotificationPopup
                    message={notification.text}
                    onClose={() => setDismissedNotifications(prev => [...prev, notification.id])}
                />
            )}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <Card className="p-4">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><UserCheck className="text-blue-400" /> Agent Status</h3>
                    <AgentStatus />
                </Card>
                <Card className="p-4 flex-1">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Trophy className="text-yellow-400" /> December Leaderboard</h3>
                    <Leaderboard />
                </Card>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
                <Card className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><GraduationCap className="text-green-400" /> Simulation: Q1 2026 Loyalty Launch</h3>
                    <p className="text-sm text-gray-400 mb-4">A virtual VIP customer, "Jordan," is asking about the 2026 Renewal Benefits.</p>
                    <SimulatedInteraction />
                </Card>
            </div>
        </div>
    );
};

export default AgentTrainingView;
