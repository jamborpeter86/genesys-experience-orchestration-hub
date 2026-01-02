
import React from 'react';
import { useAppStore } from '../../../store/useAppStore.ts';
import { Check, Clock, Edit } from 'lucide-react';
import { mockSocketService } from '../../../services/mockSocketService.ts';

const KnowledgeAlerts: React.FC = () => {
    const knowledgeGaps = useAppStore(state => state.supervisorMetrics.knowledgeGaps);

    if (knowledgeGaps.length === 0) {
        return (
            <div className="text-center text-gray-400 p-8 border-2 border-dashed border-gray-700 rounded-lg">
                <p className="font-semibold">All clear!</p>
                <p className="text-sm">No pending knowledge gaps to review.</p>
            </div>
        );
    }
    
    const pendingGaps = knowledgeGaps.filter(g => g.status === 'pending');
    const approvedGaps = knowledgeGaps.filter(g => g.status === 'approved');

    return (
        <div className="space-y-6">
            {pendingGaps.map(gap => (
                 <div key={gap.id} className="bg-gray-800/60 p-4 rounded-lg border-l-4 border-yellow-500 animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-bold text-white">Review Suggestion from {gap.agentName}</p>
                        <span className="flex items-center gap-2 text-xs font-semibold bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                           <Clock className="w-3 h-3" /> Pending Review
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-red-900/30 p-3 rounded-md">
                           <p className="font-semibold text-red-300 mb-1">Current Text</p>
                           <p className="text-gray-300">{gap.originalText}</p>
                        </div>
                         <div className="bg-green-900/30 p-3 rounded-md">
                           <p className="font-semibold text-green-300 mb-1">Suggested Update</p>
                           <p className="text-gray-200">{gap.suggestedText}</p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                         <button
                            onClick={() => mockSocketService.approveKnowledgeGap(gap)}
                            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                         >
                            <Check className="w-5 h-5" /> Approve & Sync
                         </button>
                    </div>
                 </div>
            ))}
            {approvedGaps.map(gap => (
                <div key={gap.id} className="bg-gray-800/60 p-4 rounded-lg border-l-4 border-green-500 opacity-60">
                     <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-300">Suggestion from {gap.agentName}</p>
                        <span className="flex items-center gap-2 text-xs font-semibold bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                           <Check className="w-3 h-3" /> Approved
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KnowledgeAlerts;
