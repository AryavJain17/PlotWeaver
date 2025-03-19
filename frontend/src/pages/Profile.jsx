import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
const Profile = () => {
  const [stats, setStats] = useState({
    totalStories: 0,
    wordsWritten: 0,
    avgWordCount: 0
  });

  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching profile stats:', error);
      }
    };
    fetchProfileStats();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-bold">Total Stories</h2>
            <p className="text-2xl">{stats.totalStories}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-bold">Words Written</h2>
            <p className="text-2xl">{stats.wordsWritten}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-bold">Average Word Count</h2>
            <p className="text-2xl">{stats.avgWordCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;