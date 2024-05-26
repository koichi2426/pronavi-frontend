// src/pages/status.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Status = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>Status Page</h1>
      <p>This is the status page.</p>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Status;
