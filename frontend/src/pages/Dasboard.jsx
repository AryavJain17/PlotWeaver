import React, { useState, useEffect } from 'react';
import { storyService } from '../services/api';

const Dashboard = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await storyService.getAll();
        setStories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Stories</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (
            <div key={story._id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-2">{story.title}</h2>
              <p className="text-gray-600">{story.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;