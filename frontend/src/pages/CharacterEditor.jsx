import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router';
const CharacterEditor = () => {
  const { storyId } = useParams();
  const [character, setCharacter] = useState({
    name: '',
    description: '',
    background: '',
    traits: [],
    goals: []
  });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/stories/${storyId}/characters`, character, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Character saved successfully');
    } catch (error) {
      console.error('Error saving character:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Character Editor</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={character.name}
              onChange={(e) => setCharacter({ ...character, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={character.description}
              onChange={(e) => setCharacter({ ...character, description: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Background</label>
            <textarea
              className="w-full p-2 border rounded"
              value={character.background}
              onChange={(e) => setCharacter({ ...character, background: e.target.value })}
            />
          </div>
          <button onClick={handleSave} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            Save Character
          </button>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>
          {/* AI suggestions will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default CharacterEditor;