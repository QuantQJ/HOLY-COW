import React from 'react';
import type { SimulationData } from '../types';
import VisualizationChart from './VisualizationChart';
import EigenvalueList from './EigenvalueList';
import { LoadingSpinnerIcon } from './icons/LoadingSpinnerIcon';
import { InfoIcon } from './icons/InfoIcon';
import { ErrorIcon } from './icons/ErrorIcon';
import ResultsVerification from './ResultsVerification';
import TheoreticalFramework from './TheoreticalFramework';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface ResultsDisplayProps {
  isLoading: boolean;
  error: string | null;
  data: SimulationData | null;
  selectedEnergy: number | null;
  onSelectEnergy: (energy: number) => void;
  view: 'visualization' | 'verification' | 'theory';
  setView: (view: 'visualization' | 'verification' | 'theory') => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ isLoading, error, data, selectedEnergy, onSelectEnergy, view, setView }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <LoadingSpinnerIcon className="w-12 h-12 text-cyan-400 animate-spin" />
          <h3 className="mt-4 text-xl font-semibold text-slate-300">Calibrating Quantum Manifold...</h3>
          <p className="mt-1 text-slate-400">The AI is solving the Schrödinger equation. This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-red-900/20 p-6 rounded-lg">
          <ErrorIcon className="w-12 h-12 text-red-400" />
          <h3 className="mt-4 text-xl font-semibold text-red-300">Simulation Failed</h3>
          <p className="mt-1 text-red-400 max-w-md">{error}</p>
        </div>
      );
    }
    
    const commonTabClass = "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none rounded-t-md";
    const activeTabClass = "border-b-2 border-cyan-400 text-white bg-slate-800";
    const inactiveTabClass = "border-b-2 border-transparent text-slate-400 hover:text-slate-200";

    return (
      <div>
        <div className="flex border-b border-slate-700">
          {data && (
            <>
              <button
                onClick={() => setView('visualization')}
                className={`${commonTabClass} ${view === 'visualization' ? activeTabClass : inactiveTabClass}`}
                aria-current={view === 'visualization' ? 'page' : undefined}
                role="tab"
                aria-selected={view === 'visualization'}
              >
                Visualization
              </button>
              <button
                onClick={() => setView('verification')}
                className={`${commonTabClass} ${view === 'verification' ? activeTabClass : inactiveTabClass}`}
                aria-current={view === 'verification' ? 'page' : undefined}
                role="tab"
                aria-selected={view === 'verification'}
              >
                Verification Details
              </button>
            </>
          )}
          <button
            onClick={() => setView('theory')}
            className={`${commonTabClass} ${view === 'theory' ? activeTabClass : inactiveTabClass}`}
            aria-current={view === 'theory' ? 'page' : undefined}
            role="tab"
            aria-selected={view === 'theory'}
          >
            <BookOpenIcon className="w-4 h-4" />
            Theoretical Framework
          </button>
        </div>
        <div className="pt-4">
          {view === 'visualization' && data && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                <VisualizationChart data={data} selectedEnergy={selectedEnergy} />
              </div>
              <div className="xl:col-span-1">
                <EigenvalueList 
                  eigenstates={data.eigenstates}
                  selectedEnergy={selectedEnergy}
                  onSelectEnergy={onSelectEnergy}
                />
              </div>
            </div>
          )}
          {view === 'verification' && data && <ResultsVerification />}
          {view === 'theory' && <TheoreticalFramework />}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700 min-h-[520px] flex flex-col">
        {renderContent()}
    </div>
  );
};

export default ResultsDisplay;