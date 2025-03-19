import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert("Registration failed: " + error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition duration-300">
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;