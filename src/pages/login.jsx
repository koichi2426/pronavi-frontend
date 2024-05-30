import React, { useState, useEffect, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      console.log('現在のユーザー:', user);
      window.location.assign('http://133.14.14.13/status');
    }
  }, [user]);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('サインインしたユーザー:', userCredential.user);
      window.location.assign('http://133.14.14.13/status');
    } catch (error) {
      setError(error.message);
      console.error('サインインエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}>ProNavi</div>
      {error && <p style={styles.error}>{error}</p>}
      {!user && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>メールアドレス</label>
            <input
              ref={emailInputRef}
              name="email"
              type="email"
              placeholder="メールアドレス"
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
              placeholder="パスワード"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              style={styles.passwordInput}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? <div style={styles.spinner}></div> : 'ログイン'}
            </button>
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
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  logo: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    textTransform: 'uppercase',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '16px',
    width: '100%',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: '300px',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  passwordInput: {
    width: '100%',
    maxWidth: '300px',
    padding: '12px',
    borderRadius: '5px',
    border: '1px solid #007bff',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
    fontSize: '16px',
    width: '100%',
    maxWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    border: '4px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTop: '4px solid #ffffff',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite',
  },
};

const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// スタイルをドキュメントヘッドに追加
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default Login;
