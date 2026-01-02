
import React from 'react';
import Card from '../../shared/Card.tsx';
import Leaderboard from '../../agent/scenario2/Leaderboard.tsx';
import KnowledgeAlerts from './KnowledgeAlerts.tsx';
import { Trophy, Bell } from 'lucide-react';

const KnowledgeLeadView: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            <div className="md:col-span-2 flex flex-col gap-6">
                 <Card className="p-6 h-full flex flex-col">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-yellow-300">
                        <Bell /> Knowledge Gap Alerts
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Review and approve agent-suggested updates to the 2026 Knowledge Base.
                    </p>
                    <KnowledgeAlerts />
                </Card>
            </div>
            <div className="md:col-span-1 flex flex-col gap-6">
                <Card className="p-4 flex-1">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Trophy className="text-yellow-400" /> December Leaderboard</h3>
                    <p className="text-sm text-gray-400 mb-4">Tracking agent participation in 2026 readiness sims.</p>
                    <Leaderboard />
                </Card>
            </div>
        </div>
    );
};

export default KnowledgeLeadView;
