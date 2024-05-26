// src/pages/login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      console.log('Current user:', user);
      navigate('/status');
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      navigate('/status');
    } catch (error) {
      setError(error.message);
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!user && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>メールアドレス</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </div>
          <div>
            <label>パスワード</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </div>
          <div>
            <button type="submit">ログイン</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
