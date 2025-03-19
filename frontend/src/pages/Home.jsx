import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">StoryForge AI</h1>
        <p className="text-xl mb-8">Transform your writing with AI-powered storytelling</p>
        <div className="space-x-4">
          <Link to="/register" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-100 transition duration-300">
            Get Started
          </Link>
          <Link to="/explore" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition duration-300">
            Explore Stories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;