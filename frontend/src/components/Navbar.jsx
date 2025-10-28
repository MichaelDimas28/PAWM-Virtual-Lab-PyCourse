import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'; 
import logoImage from '../assets/pycourse-logo.png';

function Navbar({ user, onLogout }) {
  return (
    <nav className={styles.navbar}>
      <Link to="/home" className={styles.logoLink}>
        <img 
          src={logoImage} 
          alt="PyCourse Logo" 
          className={styles.logoImage} 
        />
      </Link>
      
      <div className={styles.navLinks}>
        {user ? (
          <>
            <span className={styles.navText}>Hello, {user.name}</span>
            <Link to="/profile" className={styles.navLink}>Profile</Link>
            <button onClick={onLogout} className={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <Link to="/" className={styles.navLink}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
