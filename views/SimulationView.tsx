import React, { useState, useCallback } from 'react';
import { runQuantumSimulation } from '../services/geminiService';
import type { SimulationData } from '../types';
import ControlPanel from '../components/ControlPanel';
import ResultsDisplay from '../components/ResultsDisplay';

const SimulationView: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [resultsView, setResultsView] = useState<'visualization' | 'verification' | 'theory'>('theory');

  const handleRunSimulation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSelectedEnergy(null);
    setSimulationData(null);
    
    try {
      const data = await runQuantumSimulation();
      setSimulationData(data);
      if (data.eigenstates && data.eigenstates.length > 0) {
        setSelectedEnergy(data.eigenstates[0].energy);
      }
      setResultsView('visualization'); // Switch to visualization on successful simulation
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setSimulationData(null);
      setResultsView('theory'); // Revert to theory on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectEnergy = useCallback((energy: number) => {
    setSelectedEnergy(energy);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <ControlPanel onRunSimulation={handleRunSimulation} isLoading={isLoading} />
      </div>
      <div className="lg:col-span-2">
        <ResultsDisplay
          isLoading={isLoading}
          error={error}
          data={simulationData}
          selectedEnergy={selectedEnergy}
          onSelectEnergy={handleSelectEnergy}
          view={resultsView}
          setView={setResultsView}
        />
      </div>
    </div>
  );
};

export default SimulationView;
