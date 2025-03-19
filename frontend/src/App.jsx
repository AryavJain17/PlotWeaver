
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Stories from './components/Stories';
import StoryGenerator from './pages/StoryGenerator';
import CharacterDeveloper from './pages/CharacterDeveloper';
import PlotOutliner from './pages/PlotOutliner';
import DialogueGenerator from './pages/Dialouge';
import PlotInference from './pages/Writer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Token removed:', localStorage.getItem('token')); // Should log `null`
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar onLogout={handleLogout} />
        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={!isLoggedIn ? <Auth onLogin={handleLogin} /> : <Stories />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/story-generator" element={<StoryGenerator />} />
            <Route path="/character-developer" element={<CharacterDeveloper />} />
            <Route path="/plot-outliner" element={<PlotOutliner />} />
            <Route path="/dialouge" element={<DialogueGenerator />} />
            <Route path="/writer" element={<PlotInference />} />


          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;