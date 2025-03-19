import React, { useState } from 'react';
import { generateCharacter } from '../services/geminiService';

const CharacterDeveloper = () => {
  const [prompt, setPrompt] = useState('');
  const [character, setCharacter] = useState('');

  const handleGenerate = async () => {
    try {
      const generatedCharacter = await generateCharacter(prompt);
      setCharacter(generatedCharacter);
    } catch (error) {
      console.error('Error generating character:', error);
      setCharacter('Failed to generate character. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Character Developer</h2>
      <textarea
        placeholder="Describe your character (e.g., name, traits, background)..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows="4"
      />
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Generate Character
      </button>
      {character && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Generated Character</h3>
          <p className="text-gray-700">{character}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterDeveloper;