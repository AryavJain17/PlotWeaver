import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
const Settings = () => {
  const [settings, setSettings] = useState({
    aiAssistance: true,
    autoSave: true,
    theme: 'light',
    notifications: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/settings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/user/settings', settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">AI Assistance</label>
          <input
            type="checkbox"
            checked={settings.aiAssistance}
            onChange={(e) => setSettings({ ...settings, aiAssistance: e.target.checked })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Auto Save</label>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Theme</label>
          <select
            className="w-full p-2 border rounded"
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700">Notifications</label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
          />
        </div>
        <button onClick={handleSave} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;