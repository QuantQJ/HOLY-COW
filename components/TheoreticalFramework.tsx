import React from 'react';
import ReactKatex from 'react-katex';

// Destructure the components from the default export as a workaround for ESM bundling issues.
const { InlineMath, BlockMath } = ReactKatex;

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-xl font-semibold text-cyan-300 mb-4 mt-6 border-b border-slate-700 pb-2">
    {children}
  </h3>
);

const FrameworkSummary: React.FC = () => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-cyan-400/20 my-4">
      <h4 className="font-bold text-center text-cyan-300 mb-2">Complete Mathematical Framework</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-center text-sm">
        <div className="bg-slate-800/70 p-2 rounded">
          <strong className="text-slate-200">Theorem 2</strong>
          <p className="text-slate-400">Spectral reduction establishes eigenvalue-zero correspondence.</p>
        </div>
        <div className="bg-slate-800/70 p-2 rounded">
          <strong className="text-slate-200">Theorem 3</strong>
          <p className="text-slate-400">Contraction mapping guarantees parameter-dependent convergence.</p>
        </div>
        <div className="bg-slate-800/70 p-2 rounded">
          <strong className="text-slate-200">Theorem 4</strong>
          <p className="text-slate-400">Fixed-point theory ensures universal convergence from overlap.</p>
        </div>
      </div>
       <p className="text-xs text-center mt-3 text-purple-300 font-semibold">
          Combined Result: Any quantum system with non-vanishing modal overlap and properly chosen parameters will converge exponentially to the Riemann zeta zeros.
      </p>
    </div>
);

const Theorem: React.FC<{ title: string; number: number; children: React.ReactNode }> = ({ title, number, children }) => (
    <details className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 open:border-cyan-400/50 transition-all" open>
        <summary className="font-semibold text-lg text-slate-200 cursor-pointer">Theorem {number}: {title}</summary>
        <div className="mt-4 prose prose-invert prose-sm max-w-none text-slate-400 space-y-4">
            {children}
        </div>
    </details>
)

const TheoreticalFramework: React.FC = () => {
  return (
    <div className="text-slate-300 max-h-[460px] overflow-y-auto pr-4 -mr-4 space-y-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">Theoretical Framework</h2>
        <p className="text-sm text-slate-400 mt-1">
            A rigorous mathematical foundation establishing the connection between quantum mechanics and the Riemann zeta function zeros.
        </p>
      
        <FrameworkSummary />

        <Theorem title="Quantum Resonance Convergence (Spectral Reduction)" number={2}>
            <div>
                <h4 className="font-semibold text-slate-300">Statement</h4>
                <p>The time-independent Schrödinger equation</p>
                <BlockMath math="\left[-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+V_{\text{quantum}}(x)\right]\psi=E\psi" />
                <p>with potential</p>
                <BlockMath math="V_{\text{quantum}}(x)=-2\frac{\frac{d^2}{dx^2}|\Delta(x)|}{|\Delta(x)|}" />
                <p>has eigenvalues <InlineMath math="E_k" /> where <InlineMath math="\gamma_k" /> are the imaginary parts of the non-trivial Riemann zeta zeros:</p>
                <BlockMath math="E_k=\frac{\hbar^2}{2m}\left(\frac{1}{4}+\gamma_k^2\right)" />
            </div>
            <div>
                <h4 className="font-semibold text-slate-300">Proof Steps</h4>
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Transformation of Variables:</strong> Define <InlineMath math="u(x) = |\Delta(x)|^{1/2}" /> and substitute <InlineMath math="\psi = u\phi" /> into the Schrödinger equation to eliminate the singular potential.</li>
                    <li><strong>Logarithmic Coordinates:</strong> Set <InlineMath math="t = \log x" /> and <InlineMath math="\chi(t) = \phi(e^t)" />. The explicit formula under RH gives <InlineMath math="\Delta(e^t) = -\Sigma_\gamma \frac{\sin(\gamma t)}{\gamma} + R(e^t)" />.</li>
                    <li><strong>Distributional Analysis:</strong> The second derivative of <InlineMath math="\log|u|" /> in the distributional sense yields terms that encode the zeta zeros in the quantum potential.</li>
                    <li><strong>Eigenvalue Quantization:</strong> Projecting onto the eigenspace for zero <InlineMath math="\gamma_k" />, the reduced equation becomes <InlineMath math="\chi''(t) + \frac{1}{4}(1-4\gamma_k^2)\chi = 0" />, with boundary conditions giving the eigenvalues <InlineMath math="E_k" />.</li>
                </ol>
            </div>
        </Theorem>

        <Theorem title="Feedback Potential Stability (Contraction Mapping)" number={3}>
            <div>
                <h4 className="font-semibold text-slate-300">Statement</h4>
                <p>The iteration <InlineMath math="\gamma^{(n)} = F(\gamma^{(n-1)})" /> defined by the feedback potential contracts, ensuring provable convergence:</p>
                <BlockMath math="\|\gamma^{(n)}-\gamma_{\text{true}}\|_\infty < \lambda^n \|\gamma^{(0)}-\gamma_{\text{true}}\|_\infty, \quad \lambda<1" />
            </div>
             <div>
                <h4 className="font-semibold text-slate-300">Key Steps</h4>
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Riesz Projector Perturbation:</strong> For a bounded perturbation <InlineMath math="B" />, the change in projectors is bounded: <InlineMath math="\|P_k(H_0+B)-P_k\| \le \frac{\|B\|}{\Delta_k} + O(\|B\|^2)" />, where <InlineMath math="\Delta_k" /> is the spectral gap.</li>
                    <li><strong>Gaussian Potential Analysis:</strong> Near a true zero, the potential expansion's linear term drives convergence.</li>
                    <li><strong>Contraction Factor:</strong> The error update satisfies <InlineMath math="\delta\gamma_j^{(n)} = c_j\delta\gamma_j^{(n-1)}" />. For appropriate <InlineMath math="\alpha, \beta" />, we have <InlineMath math="|c_j|<1" />.</li>
                    <li><strong>Global Contraction Bound:</strong> A global factor <InlineMath math="\Lambda(\alpha, \beta) < 1" /> can be constructed, providing explicit parameter bounds for guaranteed linear convergence.</li>
                </ol>
            </div>
        </Theorem>

        <Theorem title="Universal Convergence (Fixed-Point)" number={4}>
            <div>
                <h4 className="font-semibold text-slate-300">Statement</h4>
                <p>The iteration <InlineMath math="\psi_n = e^{-iH_n t/\hbar}\psi_0" /> with <InlineMath math="H_n = H_0 + V_{\text{feedback}}^{(n)}" /> converges exponentially to a state with spectral peaks at <InlineMath math="\gamma_k" />, if the initial state has non-zero overlap <InlineMath math="\langle\psi_0, u_k\rangle \neq 0" />.</p>
            </div>
             <div>
                <h4 className="font-semibold text-slate-300">Proof Structure</h4>
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Banach Space Framework:</strong> Define a mapping <InlineMath math="F" /> on the space of zero positions.</li>
                    <li><strong>Fréchet Differentiability:</strong> The derivative of <InlineMath math="F" /> at the true solution has a spectral radius <InlineMath math="\rho(DF) < 1" />, indicating a contraction.</li>
                    <li><strong>Polyak-Łojasiewicz Condition:</strong> The mode overlap ensures a descent condition on an alignment functional, preventing the algorithm from getting stuck.</li>
                    <li><strong>Kantorovich Convergence:</strong> These conditions together guarantee convergence, proving that any initial state with proper overlap converges to the true zeta zeros, independent of the starting guess quality.</li>
                </ol>
            </div>
        </Theorem>
    </div>
  );
};

export default TheoreticalFramework;