import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthContext } from '../context/AuthContext';

const UNIVERSITY_LATITUDE_RANGE = [35.981615, 35.988737];
const UNIVERSITY_LONGITUDE_RANGE = [139.368220, 139.376497];

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
            const { latitude, longitude } = position.coords;
            console.log('Current coordinates:', latitude, longitude);

            if (
              latitude >= UNIVERSITY_LATITUDE_RANGE[0] &&
              latitude <= UNIVERSITY_LATITUDE_RANGE[1] &&
              longitude >= UNIVERSITY_LONGITUDE_RANGE[0] &&
              longitude <= UNIVERSITY_LONGITUDE_RANGE[1]
            ) {
              // ユーザーが大学の範囲内にいる場合
              console.log('ユーザーは大学の範囲内にいます。');
              updateStatus(1); // ステータスを1に更新
            } else {
              // ユーザーが大学の範囲外にいる場合
              console.log('ユーザーは大学の範囲外にいます。');
              updateStatus(4); // ステータスを4に更新
            }
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
        <h1>ステータスページ</h1>
        <div>読み込み中...</div>
      </div>
    );
  }

  return (
    <div>
      <h1>ステータスページ</h1>
      <p>これはステータスページです。</p>
      {userName && <p>ログイン中: <strong>{userName}</strong></p>}
      {userStatus && <p>現在のステータス: <strong>{userStatus}</strong></p>}
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