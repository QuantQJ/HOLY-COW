
import React from 'react';
import type { Eigenstate } from '../types';

interface EigenvalueListProps {
  eigenstates: Eigenstate[];
  selectedEnergy: number | null;
  onSelectEnergy: (energy: number) => void;
}

const EigenvalueList: React.FC<EigenvalueListProps> = ({ eigenstates, selectedEnergy, onSelectEnergy }) => {
  return (
    <div className="bg-slate-900/50 p-4 rounded-lg h-full">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Eigenvalues (Energy Levels)</h3>
      <div className="space-y-2 max-h-[384px] overflow-y-auto">
        {eigenstates.map((state, index) => {
          const isSelected = state.energy === selectedEnergy;
          return (
            <button
              key={state.energy}
              onClick={() => onSelectEnergy(state.energy)}
              className={`w-full text-left p-3 rounded-md transition-all duration-200 border-l-4 ${
                isSelected 
                  ? 'bg-cyan-500/20 border-cyan-400 shadow-lg' 
                  : 'bg-slate-800/50 border-transparent hover:bg-slate-700/50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`font-mono text-sm ${isSelected ? 'text-cyan-300' : 'text-slate-300'}`}>
                  E_{index}:
                </span>
                <span className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {state.energy.toFixed(3)}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Corresponds to Riemann Zero #{index + 1}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EigenvalueList;
