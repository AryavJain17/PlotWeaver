import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStoryById, updateStory, deleteStory } from '../services/api';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      const storyData = await getStoryById(id);
      setStory(storyData);
      setTitle(storyData.title);
      setContent(storyData.content);
    };
    fetchStory();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const updatedStory = await updateStory(id, title, content);
      setStory(updatedStory);
      alert('Story updated successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStory(id);
      alert('Story deleted successfully!');
      window.location.href = '/stories';
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  if (!story) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Story</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows="10"
      />
      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mb-2"
      >
        Update Story
      </button>
      <button
        onClick={handleDelete}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Delete Story
      </button>
    </div>
  );
};

export default StoryDetail;