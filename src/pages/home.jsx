import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      console.log('現在のユーザー:', user);
      if (user.uid) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('現在地の座標:', position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.error('Error getting location:', error);
          }
        );
      }
    }
  }, [user]);

  useEffect(() => {
    fetch('http://133.14.14.13/railsapp/api/v1/users/index')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleButtonClick = () => {
    if (user) {
      window.location.assign('http://133.14.14.13/status');
    } else {
      window.location.assign('http://133.14.14.13/login');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Home Page</h1>
      <p style={styles.description}>This is the Home page.</p>
      <button style={styles.button} onClick={handleButtonClick}>Statusページに移動</button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>UID</th>
            <th style={styles.th}>User Name</th>
            <th style={styles.th}>Department ID</th>
            <th style={styles.th}>Status ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.User_id} style={styles.tr}>
              <td style={styles.td}>{user.User_id}</td>
              <td style={styles.td}>{user.User_name}</td>
              <td style={styles.td}>{user.Department_id}</td>
              <td style={styles.td}>{user.Status_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f7f7',
    minHeight: '100vh'
  },
  title: {
    color: '#333',
    marginBottom: '20px'
  },
  description: {
    color: '#666',
    marginBottom: '20px'
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginBottom: '20px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '16px'
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    maxWidth: '800px',
    margin: '20px 0',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  th: {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#f2f2f2',
    color: '#333'
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
    color: '#555'
  },
  tr: {
    ':nth-child(even)': {
      backgroundColor: '#f9f9f9'
    },
    ':hover': {
      backgroundColor: '#f1f1f1'
    }
  }
};

export default Home;
