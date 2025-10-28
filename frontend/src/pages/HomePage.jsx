import React from 'react';
import Navbar from '../components/Navbar';
import { modules } from '../data/modules';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import Typewriter from '../components/Typewriter';

function HomePage({ user, onLogout }) {
  const completedModules = user?.progress?.filter(p => p.completed).map(p => p.moduleId) || [];

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      <main style={{ padding: '1rem' }}>
        
        <div className={styles.headerContainer}>
          <h1>Selamat Datang di PyCourse, {user?.name?.split(' ')[0]}!</h1>
          
          <Typewriter 
            texts={[
              "user = 'PyCourse'",
              "print('Hello PyCourse')",
              "for i in range(5):",
              "def greet(user):",              
            ]}
            typingSpeed={150}
            deletingSpeed={75}
            pauseDuration={1500}
          />

        </div>

        <p style={{ padding: '0 0 0 1rem' }}>Silakan pilih modul di bawah ini untuk memulai perjalanan belajar Python Anda.</p>        
        <h3 style={{ padding: '0 0 0 1rem' }}>Daftar Modul</h3>
        <div className={styles.moduleList}>
          {modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            const cardClassName = `${styles.moduleCard} ${isCompleted ? styles.completed : ''}`;

            return (
              <Link 
                key={module.id} 
                to={`/module/${module.id}`} 
                className={styles.moduleLink} 
              >
                <div className={cardClassName}>
                  <h4>{module.title}</h4>
                  {isCompleted && <span className={styles.completedText}>✔ Selesai</span>}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default HomePage;