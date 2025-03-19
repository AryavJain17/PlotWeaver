import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
const Explore = () => {
  const [publicStories, setPublicStories] = useState([]);
  const [filters, setFilters] = useState({
    genre: 'all',
    sortBy: 'recent'
  });

  useEffect(() => {
    const fetchPublicStories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stories/public', {
          params: filters
        });
        setPublicStories(response.data);
      } catch (error) {
        console.error('Error fetching public stories:', error);
      }
    };
    fetchPublicStories();
  }, [filters]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Stories</h1>
      <div className="grid grid-cols-4 gap-6">
        {publicStories.map(story => (
          <div key={story._id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">{story.title}</h2>
            <p className="text-gray-600">{story.summary}</p>
            <Link to={`/story/${story._id}`} className="text-purple-600 hover:underline mt-4 inline-block">
              View Story
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;