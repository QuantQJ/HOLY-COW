import { GoogleGenAI, Type } from "@google/genai";
import type { SimulationData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    potential: {
      type: Type.ARRAY,
      description: "Coordinates for the potential well V(x).",
      items: {
        type: Type.OBJECT,
        properties: {
          x: { type: Type.NUMBER },
          y: { type: Type.NUMBER },
        },
        required: ["x", "y"],
      },
    },
    eigenstates: {
      type: Type.ARRAY,
      description: "Calculated eigenstates, each with an energy level and wave function.",
      items: {
        type: Type.OBJECT,
        properties: {
          energy: {
            type: Type.NUMBER,
            description: "The energy eigenvalue, corresponding to a Riemann zero.",
          },
          waveFunction: {
            type: Type.ARRAY,
            description: "Coordinates for the wave function psi(x).",
            items: {
              type: Type.OBJECT,
              properties: {
                x: { type: Type.NUMBER },
                y: { type: Type.NUMBER },
              },
              required: ["x", "y"],
            },
          },
        },
        required: ["energy", "waveFunction"],
      },
    },
  },
  required: ["potential", "eigenstates"],
};

export const runQuantumSimulation = async (): Promise<SimulationData> => {
  try {
    const prompt = `
      You are a quantum physics simulator. Your task is to simulate solving the time-independent Schrödinger equation for a potential related to the Riemann Hypothesis. The goal is to find the first 5 non-trivial zeros of the Riemann Zeta function, represented as energy eigenvalues.

      1.  **Eigenvalues (Energy):** The first 5 non-trivial zeros of the Riemann Zeta function are approximately 14.135, 21.022, 25.011, 30.425, and 32.935. Use these as the 'energy' values for the eigenstates.
      2.  **Potential Well:** Generate a symmetric potential well V(x) that could plausibly contain these states. A function like V(x) = 0.01 * x^2 would be suitable. Provide 100 (x, y) data points for V(x) over an x-range of -20 to 20.
      3.  **Wave Functions (psi):** For each eigenvalue, generate a corresponding wave function psi(x).
          - The wave functions should resemble solutions to the quantum harmonic oscillator (Hermite polynomials multiplied by a Gaussian).
          - The nth wave function should have n "nodes" (cross the y=0 axis n times).
          - Normalize the wave functions so their peak amplitude is around 1.
          - Provide 100 (x, y) data points for each wave function over the same x-range of -20 to 20.

      Return the result as a single JSON object matching the provided schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    // The AI can sometimes wrap the JSON in markdown code blocks. This cleans it up.
    let jsonText = response.text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.substring(7);
      if (jsonText.endsWith("```")) {
        jsonText = jsonText.slice(0, -3);
      }
      jsonText = jsonText.trim();
    }

    const data = JSON.parse(jsonText);
    
    // Basic validation to ensure the data structure is what we expect
    if (!data.potential || !data.eigenstates || data.eigenstates.length === 0) {
        throw new Error("AI returned incomplete simulation data. Please try again.");
    }

    return data as SimulationData;

  } catch (error) {
    console.error("Error during quantum simulation:", error);
    if (error instanceof SyntaxError) {
        // This will catch JSON.parse errors
        throw new Error("The simulation returned an invalid data format. Please try running it again.");
    }
    if (error instanceof Error) {
        throw new Error(`Failed to run quantum simulation: ${error.message}`);
    }
    throw new Error("An unknown error occurred during the simulation.");
  }
};
