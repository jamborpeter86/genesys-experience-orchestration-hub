
import React from 'react';
import { useAppStore } from '../../../store/useAppStore.ts';
import { Crown } from 'lucide-react';

const Leaderboard: React.FC = () => {
    const leaderboard = useAppStore(state => state.scenario2.leaderboard);
    const agent = useAppStore(state => state.agent);

    if (!leaderboard.length) {
        return <div className="text-gray-400 text-center p-4">Loading leaderboard...</div>;
    }

    return (
        <div className="space-y-3">
            {leaderboard.map((entry, index) => {
                const isCurrentUser = entry.agentId === agent?.id;
                const rank = index + 1;
                return (
                    <div key={entry.agentId} className={`flex items-center gap-4 p-3 rounded-lg ${isCurrentUser ? 'bg-blue-600/40 ring-2 ring-blue-500' : 'bg-gray-700/50'}`}>
                        <span className={`font-bold text-lg w-6 text-center ${rank === 1 ? 'text-yellow-400' : 'text-gray-300'}`}>
                            {rank === 1 ? <Crown className="w-6 h-6 mx-auto" /> : rank}
                        </span>
                        <img src={entry.avatarUrl} alt={entry.agentName} className="w-10 h-10 rounded-full" />
                        <div className="flex-grow">
                            <p className={`font-semibold ${isCurrentUser ? 'text-white' : 'text-gray-200'}`}>{entry.agentName}</p>
                        </div>
                        <span className="font-bold text-lg text-blue-300">{entry.points} XP</span>
                    </div>
                )
            })}
        </div>
    );
};

export default Leaderboard;
