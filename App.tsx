import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import SimulationView from './views/SimulationView';
import InteractiveExplorerView from './views/InteractiveExplorerView';
import SUSYExplorerView from './views/SUSYExplorerView';
import UserGuideView from './views/UserGuideView';

export type View = 'simulation' | 'interactive' | 'susy' | 'guide';

function App() {
  const [view, setView] = useState<View>('simulation');

  const renderView = () => {
    switch (view) {
      case 'interactive':
        return <InteractiveExplorerView />;
      case 'susy':
        return <SUSYExplorerView />;
      case 'guide':
        return <UserGuideView />;
      case 'simulation':
      default:
        return <SimulationView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-300 font-sans">
      <Sidebar view={view} setView={setView} />
      <div className="flex-1 h-screen overflow-y-auto" id="main-content">
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col min-h-full">
            <Header />
            <main className="flex-grow mt-8">
              {renderView()}
            </main>
            <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
