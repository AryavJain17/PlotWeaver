import React, { useState } from 'react';
import { generatePlot } from '../services/geminiService';

const PlotOutliner = () => {
  const [prompt, setPrompt] = useState('');
  const [plot, setPlot] = useState('');

  const handleGenerate = async () => {
    try {
      const generatedPlot = await generatePlot(prompt);
      setPlot(generatedPlot);
    } catch (error) {
      console.error('Error generating plot:', error);
      setPlot('Failed to generate plot. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Plot Outliner</h2>
      <textarea
        placeholder="Enter a prompt for your plot..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows="4"
      />
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Generate Plot
      </button>
      {plot && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Generated Plot</h3>
          <p className="text-gray-700">{plot}</p>
        </div>
      )}
    </div>
  );
};

export default PlotOutliner;