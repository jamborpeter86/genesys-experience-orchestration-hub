import React, { useState } from 'react';
import { FileText, AlertCircle, Edit, ExternalLink } from 'lucide-react';
import Card from '../../shared/Card.tsx';

interface DocumentViewerProps {
    onSuggestUpdate: (selectedText: string) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ onSuggestUpdate }) => {
    const [selectedText, setSelectedText] = useState<string | null>(null);

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim().length > 0) {
            setSelectedText(selection.toString().trim());
        }
    };

    // Hardcoded document content for the simulation
    return (
        <Card className="flex flex-col h-full overflow-hidden bg-gray-800 border border-gray-700">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-900/50">
                <div className="flex items-center gap-3">
                    <div className="bg-red-500/20 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-200">VIP Renewal Tiers - FINAL.pdf</h3>
                        <p className="text-xs text-gray-400">Last Updated: Oct 2025 • Internal Use Only</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                </button>
            </div>

            <div
                className="flex-1 overflow-y-auto p-6 text-gray-300 space-y-4 font-serif leading-relaxed relative"
                onMouseUp={handleTextSelection}
            >
                {selectedText && (
                    <div className="absolute top-4 right-4 animate-fade-in z-10">
                        <button
                            onClick={() => {
                                onSuggestUpdate(selectedText);
                                setSelectedText(null);
                                window.getSelection()?.removeAllRanges();
                            }}
                            className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 transform transition-all hover:scale-105"
                        >
                            <Edit className="w-4 h-4" />
                            Suggest Update
                        </button>
                    </div>
                )}

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-100 mb-2">2026 VIP Loyalty Program Guidelines</h1>
                    <div className="h-1 w-20 bg-blue-500 rounded"></div>
                </div>

                <div className="bg-blue-900/20 p-4 border border-blue-900/50 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-200">
                            <strong>Note:</strong> These tiers are effective January 1, 2026. All agents must reference this document for customer inquiries regarding renewal benefits.
                        </p>
                    </div>
                </div>

                <section>
                    <h4 className="text-lg font-bold text-gray-100 mb-2">1. Tier Definitions</h4>
                    <p className="mb-2">There are three primary tiers in the new structure:</p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li><strong>Silver:</strong> $0 - $5,000 annual spend</li>
                        <li><strong>Gold:</strong> $5,001 - $15,000 annual spend</li>
                        <li><strong>Platinum:</strong> $15,000+ annual spend</li>
                    </ul>
                </section>

                <section>
                    <h4 className="text-lg font-bold text-gray-100 mb-2">2. Cashback & Rewards</h4>
                    <p className="mb-2">Customers in the <strong>Platinum</strong> tier are eligible for enhanced cashback rewards on all purchases.</p>
                    <div className="bg-gray-700/30 p-4 rounded border border-gray-600 my-4">
                        <h5 className="font-bold text-white mb-2 underline decoration-gray-500">Policy Parameter: Cashback Rate</h5>
                        <p>
                            Effective for the 2026 fiscal year, Platinum members will receive a standard <span className="bg-yellow-500/10 text-yellow-200 px-1 rounded border border-yellow-500/30">3% cashback</span> on all qualified transactions, capped at $500 monthly.
                        </p>
                    </div>
                    <p className="text-sm italic text-gray-500">
                        *Rates are subject to quarterly review by the Finance Committee.
                    </p>
                </section>

                <section>
                    <h4 className="text-lg font-bold text-gray-100 mb-2">3. Priority Support</h4>
                    <p>
                        Platinum members retain access to the 24/7 dedicated support line and guaranteed &lt; 2 minute wait times.
                    </p>
                </section>
            </div>

            <div className="p-3 bg-gray-900/80 border-t border-gray-700 text-xs text-center text-gray-500">
                Confidential - Do Not Distribute
            </div>
        </Card>
    );
};

export default DocumentViewer;
