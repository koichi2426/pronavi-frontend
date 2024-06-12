import React, { useEffect, useState } from 'react';
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
    if (user) {
      console.log('Logged in user:', user);
      if (user.uid) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('Current coordinates:', position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.error('Error getting location:', error);
          }
        );
      }
      fetchUserData(user.uid);
    }
  }, [user]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch('https://www.pronavi.online/railsapp/api/v1/users/index');
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateStatus = async (statusId) => {
    if (user) {
      try {
        const response = await fetch(`https://www.pronavi.online/railsapp/api/v1/users/${user.uid}/schedules`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            schedule: {
              status_id: statusId,
            },
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
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div>
        <h1>Status Page</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Status Page</h1>
      <p>This is the status page.</p>
      {userName && <p>Logged in as: <strong>{userName}</strong></p>}
      {userStatus && <p>Current status: <strong>{userStatus}</strong></p>}
      <div>
        {[1, 2, 3, 4, 5, 6].map(statusId => (
          <button key={statusId} onClick={() => updateStatus(statusId)}>
            {statusId}
          </button>
        ))}
      </div>
      <div>
        <button onClick={handleHomeClick}>ホームに移動</button>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </div>
  );
};

export default Status;
