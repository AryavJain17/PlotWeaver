import React, { useState } from 'react';
import { generateStory } from '../services/geminiService';

const StoryGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');

  const handleGenerate = async () => {
    try {
      const generatedStory = await generateStory(prompt);
      setStory(generatedStory);
    } catch (error) {
      console.error('Error generating story:', error);
      setStory('Failed to generate story. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Story Generator</h2>
      <textarea
        placeholder="Enter a prompt for your story..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows="4"
      />
      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Generate Story
      </button>
      {story && (
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Generated Story</h3>
          <p className="text-gray-700">{story}</p>
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;