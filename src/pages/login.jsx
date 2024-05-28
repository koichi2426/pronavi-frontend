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
    <div style={styles.container}>
      <h1 style={styles.title}>ログイン</h1>
      {error && <p style={styles.error}>{error}</p>}
      {!user && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>メールアドレス</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>パスワード</label>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>ログイン</button>
          </div>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  error: {
    color: 'red',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Login;
