
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAppStore } from '../../store/useAppStore.ts';

const RagFidelityChart: React.FC = () => {
    const ragAcceptanceRate = useAppStore(state => state.supervisorMetrics.ragAcceptanceRate);

    // FIX: Ensure the rate is a valid number before passing to the chart, preventing render errors.
    const safeRate = typeof ragAcceptanceRate === 'number' ? ragAcceptanceRate : 0;

    // Memoize the data array to prevent it from being recreated on every render,
    // which can cause issues with the recharts library.
    const data = useMemo(() => [
      { name: '8am', acceptanceRate: 90 },
      { name: '9am', acceptanceRate: 92 },
      { name: '10am', acceptanceRate: 88 },
      { name: '11am', acceptanceRate: 91 },
      { name: '12pm', acceptanceRate: 92 },
      { name: 'Now', acceptanceRate: safeRate },
    ], [safeRate]);

    return (
        <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12} />
                    <YAxis domain={[80, 100]} stroke="#A0AEC0" fontSize={12} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1A202C',
                            borderColor: '#4A5568',
                            color: '#E2E8F0'
                        }}
                    />
                    <Legend wrapperStyle={{fontSize: "12px"}}/>
                    <Line
                        type="monotone"
                        dataKey="acceptanceRate"
                        name="Acceptance Rate (%)"
                        stroke="#38B2AC"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RagFidelityChart;