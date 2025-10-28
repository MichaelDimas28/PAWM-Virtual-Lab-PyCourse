import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function AuthPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/api/auth/login', { email, password });

      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data.token);
        navigate('/home');
      } else {
        const data = await response.json();
        setError(data.msg || 'Login failed. Please check your email and password.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1>Selamat Datang!</h1>
        <p>Login untuk memulai perjalanan Python Anda di PyCourse.</p>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
