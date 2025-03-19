import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({ theme: 'light', aiAssistance: true, autoSave: true });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setUsername(profile.username);
      setEmail(profile.email);
      setPreferences(profile.preferences);
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(username, email, preferences);
      alert('Profile updated successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;