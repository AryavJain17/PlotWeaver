import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">ThinkerPoint</h1>
      <div className="space-x-4">
      <Link to="/story-generator" className="hover:text-blue-200">
          Home
        </Link>
        {/* <Link to="/story-generator" className="hover:text-blue-200">
          Story Generator
        </Link> */}
        <Link to="/character-developer" className="hover:text-blue-200">
          Character Developer
        </Link>
        <Link to="/plot-outliner" className="hover:text-blue-200">
          Plot Outliner
        </Link>
        <Link to="/dialouge" className="hover:text-blue-200">
          Dialouge generator
        </Link>
        <Link to="/writer" className="hover:text-blue-200">
          Writer inference
        </Link>
        <Link to="/profile" className="hover:text-blue-200">
           Profile
        </Link>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;