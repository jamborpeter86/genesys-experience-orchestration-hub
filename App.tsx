
import React, { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore.ts';
import { mockSocketService } from './services/mockSocketService.ts';
import AgentView from './components/agent/AgentView.tsx';
import SupervisorView from './components/supervisor/SupervisorView.tsx';
import MobileSimulatorView from './components/customer/MobileSimulatorView.tsx';
import { LayoutDashboard, User, Smartphone, Bot, Shield, GraduationCap } from 'lucide-react';
import type { View, Scenario } from './types.ts';
import Card from './components/shared/Card.tsx';

const App: React.FC = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const simulationState = useAppStore((state) => state.simulationState);
  const activeView = useAppStore((state) => state.activeView);
  const activeScenario = useAppStore((state) => state.activeScenario);
  
  const startSimulation = useAppStore((state) => state.actions.startSimulation);
  const resetSimulation = useAppStore((state) => state.actions.resetSimulation);
  const setActiveView = useAppStore((state) => state.actions.setActiveView);

  useEffect(() => {
    const initialize = async () => {
      await mockSocketService.init();
      setIsDataLoaded(true);
    };
    initialize();
    
    return () => {
      mockSocketService.cleanup();
    };
  }, []);

  const handleStartSimulation = (scenario: Scenario) => {
    if (scenario === 'scenario1') {
      mockSocketService.startScenario();
    } else {
      mockSocketService.startScenario2();
    }
    startSimulation(scenario);
  };

  const handleResetSimulation = () => {
    mockSocketService.stopScenario();
    resetSimulation();
  };

  const renderView = () => {
    switch (activeView) {
      case 'agent':
        return <AgentView />;
      case 'supervisor':
        return <SupervisorView />;
      case 'customer':
        return activeScenario === 'scenario1' ? <MobileSimulatorView /> : null;
      default:
        return activeScenario === 'scenario1' ? <MobileSimulatorView /> : <AgentView />;
    }
  };
  
  const ScenarioSelector = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-3xl font-bold text-white mb-4">Select a Simulation Scenario</h2>
      <p className="text-gray-400 mb-8 max-w-2xl">
        Choose a scenario to explore the capabilities of the Genesys Experience Orchestration Hub. Each scenario demonstrates a different aspect of AI-native contact center operations.
      </p>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="p-8 text-left flex flex-col hover:border-blue-500 transition-all duration-300">
           <div className="flex-grow">
              <Shield className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Scenario 1: Live Experience Orchestration</h3>
              <p className="text-gray-400">
                A real-time simulation of a customer failing with a bot and being seamlessly handed off to a live agent with full context, AI assistance, and supervisor oversight.
              </p>
           </div>
           <button
             onClick={() => handleStartSimulation('scenario1')}
             className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
             disabled={!isDataLoaded}
           >
             {isDataLoaded ? 'Start Scenario 1' : 'Loading...'}
           </button>
        </Card>
        <Card className="p-8 text-left flex flex-col hover:border-green-500 transition-all duration-300">
           <div className="flex-grow">
              <GraduationCap className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Scenario 2: The Knowledge Guardian Cycle</h3>
              <p className="text-gray-400">
                A gamified training simulation where an agent identifies and corrects a knowledge base error during downtime, which is then reviewed and approved by a Knowledge Lead.
              </p>
           </div>
           <button
             onClick={() => handleStartSimulation('scenario2')}
             className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
             disabled={!isDataLoaded}
           >
             {isDataLoaded ? 'Start Scenario 2' : 'Loading...'}
           </button>
        </Card>
      </div>
    </div>
  );

  const NavButton = ({ view, label, icon: Icon }: { view: View; label: string; icon: React.ElementType }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex flex-col items-center justify-center space-y-1 px-4 py-2 text-xs font-medium transition-all duration-200 rounded-lg ${
        activeView === view
          ? 'bg-blue-600/80 text-white'
          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col antialiased">
       <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 p-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-bold text-white tracking-tight">
            Genesys <span className="text-blue-400">Experience Orchestration Hub</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
           {simulationState !== 'idle' && (
             <button onClick={handleResetSimulation} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
               Reset Scenario
             </button>
           )}
        </div>
      </header>
      
      {simulationState === 'idle' ? (
        <ScenarioSelector />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <nav className="w-24 bg-gray-900/30 border-r border-gray-700/50 p-3 flex flex-col items-center space-y-4">
            {activeScenario === 'scenario1' && <NavButton view="customer" label="Customer" icon={Smartphone} />}
            <NavButton view="agent" label="Agent" icon={User} />
            <NavButton view="supervisor" label={activeScenario === 'scenario2' ? "Lead" : "Supervisor"} icon={LayoutDashboard} />
          </nav>

          <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-800/20">
            {renderView()}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
