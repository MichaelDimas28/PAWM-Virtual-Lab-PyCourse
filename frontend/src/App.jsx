import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ModulePage from './pages/ModulePage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import api from './api';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          const response = await api.get('/api/auth/me');
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          setUser(null);
        }
      }
      setIsLoading(false);
    }
    fetchUser();
  }, [token]);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={!user ? <AuthPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/home" replace />} 
        />
        
        <Route 
          path="/home" 
          element={
            <ProtectedRoute user={user}>
              <HomePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module/:moduleId" 
          element={
            <ProtectedRoute user={user}>
              <ModulePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute user={user}>
              <ProfilePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to={user ? "/home" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;