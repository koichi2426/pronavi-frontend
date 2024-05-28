<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>> development
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthContext } from '../context/AuthContext';

const Status = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      console.log('Logged in user:', user);
<<<<<<< HEAD
      fetchUserData(user.uid);
    }
  }, [user, navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch('http://127.0.0.1:3001/userget');
      const data = await response.json();
      const currentUser = data.find(u => u.User_id === userId);
      if (currentUser) {
        setUserName(currentUser.User_name);
        setUserStatus(currentUser.Status_id);
      } else {
        setUserName('none');
        setUserStatus('none');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserName('none');
      setUserStatus('none');
    }
  };
=======
    } else {
      navigate('/login');
    }
  }, [user, navigate]);
>>>>>>> development

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateStatus = async (statusId) => {
    if (user) {
      try {
        const response = await fetch('http://127.0.0.1:3001/updatestatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            User_id: user.uid,
            Status_id: statusId,
          }),
        });
        const result = await response.json();
        if (result.update) {
          console.log(`Status updated to ${statusId}`);
          setUserStatus(statusId); // Update the local status
        } else {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Status Page</h1>
      <p style={styles.description}>This is the status page.</p>
      {userName && <p style={styles.userName}>Logged in as: <span style={styles.bold}>{userName}</span></p>}
      {userStatus && <p style={styles.userStatus}>Current status: <span style={styles.bold}>{userStatus}</span></p>}
      <div style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6].map(statusId => (
          <button
            key={statusId}
            style={styles.button}
            onClick={() => updateStatus(statusId)}
          >
            {statusId}
          </button>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleHomeClick}>ホームに移動</button>
        <button style={styles.button} onClick={handleLogout}>ログアウト</button>
      </div>
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
    minHeight: '100vh',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    color: '#666',
    marginBottom: '20px',
  },
  userName: {
    color: '#555',
    marginBottom: '10px',
    fontSize: '18px',
  },
  userStatus: {
    color: '#555',
    marginBottom: '20px',
    fontSize: '18px',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Status;
