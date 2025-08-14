import React from 'react';

const UserGuideView: React.FC = () => {
  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 border border-slate-700 text-center">
      <h2 className="text-2xl font-bold text-cyan-300">User Guide & Help</h2>
      <p className="mt-4 text-slate-400">
        This section is under construction. Documentation and additional resources will be available here soon.
      </p>
       <div className="mt-8 text-left text-sm text-slate-400 space-y-4 max-w-2xl mx-auto">
          <div>
              <h3 className="font-semibold text-slate-200">AI Simulation</h3>
              <p>Generate quantum states corresponding to Riemann zeros using a generative AI model. Visualize the potential well, energy levels, and wave functions.</p>
          </div>
          <div>
              <h3 className="font-semibold text-slate-200">Interactive Explorer</h3>
              <p>Experiment with the theoretical parameters of the feedback system. See how they affect the model's convergence and stability in real-time.</p>
          </div>
          <div>
              <h3 className="font-semibold text-slate-200">SUSY QM Analysis</h3>
              <p>Explore the deep connection to Supersymmetric Quantum Mechanics, including partner potentials, spectral mirroring, and the Witten Index.</p>
          </div>
      </div>
    </div>
  );
};

export default UserGuideView;
