import React from 'react';
import type { View } from '../App';
import { AtomIcon } from './icons/AtomIcon';
import { CpuChipIcon } from './icons/CpuChipIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BeakerIcon } from './icons/BeakerIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';


interface SidebarProps {
    view: View;
    setView: (view: View) => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
    const baseClasses = "flex items-center gap-3 w-full px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200";
    const activeClasses = "bg-cyan-500/10 text-cyan-300";
    const inactiveClasses = "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200";

    return (
        <li>
            <button
                onClick={onClick}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                aria-current={isActive ? 'page' : undefined}
            >
                {icon}
                <span className="flex-1 text-left">{label}</span>
            </button>
        </li>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ view, setView }) => {
    return (
        <nav className="w-64 bg-slate-900/70 backdrop-blur-sm border-r border-slate-700/50 p-4 flex flex-col">
            <div className="flex items-center gap-3 px-2 pb-4 border-b border-slate-700">
                <AtomIcon className="w-8 h-8 text-cyan-400" />
                <span className="font-bold text-lg text-white">QRE</span>
            </div>
            <ul className="mt-6 space-y-2 flex-grow">
                <NavItem
                    label="AI Simulation"
                    icon={<CpuChipIcon className="w-5 h-5" />}
                    isActive={view === 'simulation'}
                    onClick={() => setView('simulation')}
                />
                <NavItem
                    label="Interactive Explorer"
                    icon={<ChartBarIcon className="w-5 h-5" />}
                    isActive={view === 'interactive'}
                    onClick={() => setView('interactive')}
                />
                <NavItem
                    label="SUSY QM Analysis"
                    icon={<BeakerIcon className="w-5 h-5" />}
                    isActive={view === 'susy'}
                    onClick={() => setView('susy')}
                />
                 <NavItem
                    label="User Guide"
                    icon={<QuestionMarkCircleIcon className="w-5 h-5" />}
                    isActive={view === 'guide'}
                    onClick={() => setView('guide')}
                />
            </ul>
             <div className="flex-shrink-0">
                <p className="text-xs text-slate-500 text-center">
                    Quantum Riemann Explorer v2.0
                </p>
            </div>
        </nav>
    );
};

export default Sidebar;
