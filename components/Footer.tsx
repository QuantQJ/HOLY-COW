
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full mt-12 text-center text-slate-500 text-sm">
            <p>
                Quantum Riemann Explorer. Simulation powered by Google Gemini.
            </p>
            <p>
                A conceptual visualization based on the Berry-Keating conjecture. Not a formal proof.
            </p>
        </footer>
    );
};

export default Footer;
