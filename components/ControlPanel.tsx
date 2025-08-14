
import React from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { LoadingSpinnerIcon } from './icons/LoadingSpinnerIcon';

interface ControlPanelProps {
  onRunSimulation: () => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onRunSimulation, isLoading }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700 h-full">
      <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Simulation Controls</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-slate-300">Parameters</h3>
          <p className="text-sm text-slate-400">
            The following parameters are used by the AI to model the system.
          </p>
          <div className="mt-2 space-y-2 text-sm p-3 bg-slate-900/70 rounded-md">
            <div className="flex justify-between">
              <span className="font-mono text-slate-400">Potential V(x):</span>
              <span className="font-mono text-cyan-400">0.01 * x²</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-slate-400">Target:</span>
              <span className="font-mono text-cyan-400">Riemann Zeros</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-slate-400">AI Model:</span>
              <span className="font-mono text-cyan-400">gemini-2.5-flash</span>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <button
            onClick={onRunSimulation}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 font-bold text-white bg-cyan-600 rounded-lg shadow-md hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {isLoading ? (
              <>
                <LoadingSpinnerIcon className="w-5 h-5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <PlayIcon className="w-5 h-5" />
                <span>Run Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
