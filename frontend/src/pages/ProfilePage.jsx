import React from 'react';
import Navbar from '../components/Navbar';
import styles from './ProfilePage.module.css';
import { modules } from '../data/modules';

function ProfilePage({ user, onLogout }) {
  const completedModulesCount = user?.progress?.filter(p => p.completed).length || 0;
  const totalModules = modules.length;
  const progressPercentage = totalModules > 0 ? (completedModulesCount / totalModules) * 100 : 0;

  return (
    <div className={styles.profilePage}>
      <Navbar user={user} onLogout={onLogout} />
      <div className={styles.profileCard}>
        <div className={styles.userInfo}>
          <img src={user.picture} alt="Foto Profil" className={styles.profilePicture} />
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
        </div>

        <hr className={styles.divider} />

        <div className={styles.progressSection}>
          <h3>Progres Belajar Anda</h3>
          <p className={styles.progressText}>
            {completedModulesCount} dari {totalModules} modul telah diselesaikan.
          </p>
          <div className={styles.progressBarContainer}>
            <div 
              className={styles.progressBar} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <button onClick={onLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;