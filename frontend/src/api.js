const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    // In production, use the Railway backend URL from environment variables
    return import.meta.env.VITE_BACKEND_URL_RAILWAY;
  }
  // In development, use a relative path to utilize the Vite proxy
  return ''; 
};

const API_URL = getBaseUrl();

const api = {
  post: async (endpoint, body) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token') || '',
      },
      body: JSON.stringify(body),
    });
    return response;
  },
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'x-auth-token': localStorage.getItem('token') || '',
      },
    });
    return response;
  },
};

export default api;
