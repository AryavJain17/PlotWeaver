import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router';
const StoryEditor = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/stories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStory(response.data);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };
    fetchStory();
  }, [id]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/stories/${id}`, { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Story saved successfully');
    } catch (error) {
      console.error('Error saving story:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <textarea
            className="w-full h-[600px] p-4 border rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSave} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            Save Story
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="mb-4">
              <p>{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryEditor;