import React, { useEffect, useState } from 'react';
import { createStory, getStories, generateContent } from '../services/api';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await getStories();
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };
    fetchStories();
  }, []);

  const handleCreateStory = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Generate story content using the prompt
      const generatedContent = await generateContent(prompt, 'story');

      // Step 2: Create the story with the generated content
      const newStory = await createStory(title, prompt, generatedContent);
      setStories([...stories, newStory]);
      setTitle('');
      setPrompt('');
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a Story</h2>
      <form onSubmit={handleCreateStory} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Create Story
        </button>
      </form>
      <h3 className="text-xl font-bold mt-6 mb-4">Your Stories</h3>
      <ul className="space-y-4">
        {stories.map((story) => (
          <li key={story._id} className="p-4 border rounded-lg shadow-sm">
            <strong className="text-lg font-semibold">{story.title}</strong>
            <p className="text-gray-700">{story.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stories;