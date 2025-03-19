import React, { useState } from 'react';
import { generateDialogue } from '../services/geminiService';

const DialogueGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [dialogue, setDialogue] = useState('');

  const handleGenerate = async () => {
    try {
      const generatedDialogue = await generateDialogue(prompt);
      setDialogue(generatedDialogue);
    } catch (error) {
      console.error('Error generating dialogue:', error);
      setDialogue('Failed to generate dialogue. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dialogue Generator</h2>
      <textarea
        placeholder="Describe the scene or characters for the dialogue..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows="4"
      />
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Generate Dialogue
      </button>
      {dialogue && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Generated Dialogue</h3>
          <p className="text-gray-700">{dialogue}</p>
        </div>
      )}
    </div>
  );
};

export default DialogueGenerator;