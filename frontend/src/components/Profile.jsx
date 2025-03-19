import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="text-gray-700">
        <span className="font-semibold">Username:</span> {user.username}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
    </div>
  );
};

export default Profile;