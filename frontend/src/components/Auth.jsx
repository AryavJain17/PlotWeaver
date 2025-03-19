import React, { useState } from 'react';
import { register, login } from '../services/api';

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isRegistering
        ? await register(username, email, password)
        : await login(email, password);
      localStorage.setItem('token', data.token);
      onLogin();
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegistering ? 'Register' : 'Login'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegistering && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="w-full mt-4 text-blue-600 hover:text-blue-700"
      >
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
};

export default Auth;