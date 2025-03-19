// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add a request interceptor to include the token in headers
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const register = async (username, email, password) => {
//   const response = await api.post('/auth/register', { username, email, password });
//   return response.data;
// };

// export const login = async (email, password) => {
//   const response = await api.post('/auth/login', { email, password });
//   return response.data;
// };

// export const getProfile = async () => {
//   const response = await api.get('/user/profile');
//   return response.data;
// };
// export const generateContent = async (prompt, type) => {
//     const response = await api.post('/stories/generate', { prompt, type });
//     return response.data.content;
//   };
//   export const createStory = async (title, prompt, content) => {
//     const response = await api.post('/stories', { title, prompt, content });
//     return response.data;
//   };
// export const getStories = async () => {
//   const response = await api.get('/stories');
//   return response.data;
// };
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth Routes
export const register = async (username, email, password) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// User Routes
export const getProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const updateProfile = async (username, email, preferences) => {
  const response = await api.put('/user/profile', { username, email, preferences });
  return response.data;
};

// Story Routes
export const generateContent = async (prompt, type) => {
  const response = await api.post('/stories/generate', { prompt, type });
  return response.data.content;
};

export const createStory = async (title, prompt, content) => {
  const response = await api.post('/stories', { title, prompt, content });
  return response.data;
};

export const getStories = async () => {
  const response = await api.get('/stories');
  return response.data;
};

export const getStoryById = async (id) => {
  const response = await api.get(`/stories/${id}`);
  return response.data;
};

export const updateStory = async (id, title, content) => {
  const response = await api.put(`/stories/${id}`, { title, content });
  return response.data;
};

export const deleteStory = async (id) => {
  const response = await api.delete(`/stories/${id}`);
  return response.data;
};