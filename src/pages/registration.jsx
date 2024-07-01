import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    if (email && password && confirmPassword && username && department && locationPermission) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [email, password, confirmPassword, username, department, locationPermission]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const departmentId = getDepartmentId(department);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('位置情報:', latitude, longitude);
          },
          (error) => {
            console.error('位置情報取得エラー:', error);
          }
        );
      } else {
        console.error('ブラウザは位置情報取得をサポートしていません');
      }

      const response = await sendUserDataToAPI(user.uid, username, departmentId, email);

      if (response.registration === true) {
        setMessage('ユーザー登録が成功しました');
        window.location.href = '/completion';
      } else {
        setError('ユーザー登録に失敗しました');
      }
      console.log('ユーザー登録:', user);
    } catch (error) {
      setError(error.message);
      console.error('ユーザー登録エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.currentTarget.value);
  };

  const handleChangeDepartment = (event) => {
    setDepartment(event.currentTarget.value);
  };

  const handleChangeLocationPermission = (event) => {
    setLocationPermission(event.currentTarget.checked);
  };

  const getDepartmentId = (department) => {
    const departments = { RU: 1, RB: 2, RD: 3, RE: 4, RM: 5, RG: 6, RL: 7 }; // RL added
    return departments[department] || null;
  };

  const sendUserDataToAPI = async (userId, userName, departmentId, mailaddress) => {
    try {
      const response = await fetch('https://www.pronavi.online/railsapp/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          user_name: userName,
          department_id: departmentId,
          mailaddress: mailaddress,
        }),
      });

      if (!response.ok) {
        throw new Error('ネットワーク応答が不正です');
      }

      const data = await response.json();
      console.log('API応答:', data);
      return data;
    } catch (error) {
      console.error('ユーザーデータ送信エラー:', error);
      setError('ユーザーデータの送信に失敗しました');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}>ProNavi</div>
      <h1 style={styles.title}>ユーザー登録</h1>
      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={handleChangeEmail}
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
            onChange={handleChangePassword}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>パスワード確認</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="パスワード確認"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>氏名</label>
          <input
            name="username"
            type="text"
            placeholder="氏名"
            value={username}
            onChange={handleChangeUsername}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>学系</label>
          <select value={department} onChange={handleChangeDepartment} style={styles.input}>
            <option value="">学系を選択してください</option>
            <option value="RU">RU</option>
            <option value="RB">RB</option>
            <option value="RD">RD</option>
            <option value="RE">RE</option>
            <option value="RM">RM</option>
            <option value="RG">RG</option>
            <option value="RL">RL</option> {/* RL added */}
          </select>
        </div>
        <div style={styles.inputGroup}>
          <p style={styles.locationDescription}>自動出勤機能のため、位置情報を取得します。</p>
          <label style={styles.label}>位置情報の取得を許可しますか？</label>
          <input
            name="locationPermission"
            type="checkbox"
            checked={locationPermission}
            onChange={handleChangeLocationPermission}
            style={styles.checkbox}
          />
        </div>
        <div style={styles.buttonContainer}>
          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: isFormValid ? 1 : 0.6,
              cursor: isFormValid ? 'pointer' : 'not-allowed'
            }}
            disabled={!isFormValid || loading}
          >
            {loading ? <div style={styles.spinner}></div> : '登録'}
          </button>
        </div>
      </form>
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
  title: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  message: {
    color: 'green',
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
  checkbox: {
    width: '16px',
    height: '16px',
    marginTop: '10px',
  },
  locationDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
    textAlign: 'center',
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

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);

export default Registration;
