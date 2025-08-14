
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { SimulationData } from '../types';

interface VisualizationChartProps {
  data: SimulationData;
  selectedEnergy: number | null;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

const VisualizationChart: React.FC<VisualizationChartProps> = ({ data, selectedEnergy }) => {
  const chartData = useMemo(() => {
    if (!data.potential || data.potential.length === 0) {
      return [];
    }

    const combined = data.potential.map((p, i) => {
      const point: { [key: string]: number } = { x: p.x, potential: p.y };
      data.eigenstates.forEach((state, stateIndex) => {
        // Offset wave function by its energy for better visualization
        const waveY = state.waveFunction[i]?.y ?? 0;
        const energyOffset = state.energy;
        point[`psi_${stateIndex}`] = waveY + energyOffset;
      });
      return point;
    });

    return combined;
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 p-3 rounded-md shadow-lg">
          <p className="font-bold text-cyan-300">{`Position (x): ${label.toFixed(2)}`}</p>
          {payload.map((pld: any) => (
            <div key={pld.dataKey} style={{ color: pld.color }}>
              {pld.dataKey.startsWith('psi') ? 
                `Ψ_${pld.dataKey.split('_')[1]} + E: ${pld.value.toFixed(3)}` : 
                `Potential: ${pld.value.toFixed(3)}`}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full h-[432px] bg-slate-900/50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4 ml-4">Energy Landscape</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 0, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={['dataMin', 'dataMax']} 
            tick={{ fill: '#94a3b8' }} 
            stroke="#64748b"
            label={{ value: 'Position (x)', position: 'insideBottom', offset: -15, fill: '#cbd5e1' }}
          />
          <YAxis 
            tick={{ fill: '#94a3b8' }} 
            stroke="#64748b" 
            label={{ value: 'Energy (E)', angle: -90, position: 'insideLeft', fill: '#cbd5e1', dx: -10 }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ bottom: 0 }} />

          <Line type="monotone" dataKey="potential" stroke="#f472b6" strokeWidth={2} dot={false} name="Potential V(x)" />

          {data.eigenstates.map((state, index) => {
              const isSelected = state.energy === selectedEnergy;
              return (
                <ReferenceLine 
                  key={`ref_${index}`} 
                  y={state.energy} 
                  label={{ value: `E_${index} = ${state.energy.toFixed(3)}`, fill: COLORS[index % COLORS.length], position: 'right', fontSize: 12 }} 
                  stroke={COLORS[index % COLORS.length]} 
                  strokeDasharray="4 4" 
                  strokeWidth={isSelected ? 2 : 1}
                  opacity={isSelected ? 1 : 0.6}
                />
              )
          })}

          {data.eigenstates.map((state, index) => {
              const isSelected = state.energy === selectedEnergy;
              return (
                <Line
                  key={`psi_${index}`}
                  type="monotone"
                  dataKey={`psi_${index}`}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={isSelected ? 3 : 1.5}
                  dot={false}
                  name={`Ψ_${index}`}
                  opacity={isSelected ? 1 : 0.7}
                />
              )
          })}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisualizationChart;
