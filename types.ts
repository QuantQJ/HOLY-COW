
export interface Point {
  x: number;
  y: number;
}

export interface Eigenstate {
  energy: number;
  waveFunction: Point[];
}

export interface SimulationData {
  potential: Point[];
  eigenstates: Eigenstate[];
}
