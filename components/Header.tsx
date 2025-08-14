
import React from 'react';
import { AtomIcon } from './icons/AtomIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-cyan-400/20 pb-6">
      <div className="flex items-center justify-center gap-4">
        <AtomIcon className="w-12 h-12 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
          Quantum Riemann Explorer
        </h1>
      </div>
      <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
        An AI-powered simulation visualizing the theorized link between the Riemann Hypothesis and the eigenvalues of a quantum system.
      </p>
    </header>
  );
};

export default Header;
