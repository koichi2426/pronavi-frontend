import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const UNIVERSITY_LATITUDE_RANGE = [35.981615, 35.988737];
const UNIVERSITY_LONGITUDE_RANGE = [139.368220, 139.376497];

const Home = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

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

  useEffect(() => {
    if (user) {
      console.log('現在のユーザー:', user);
      if (user.uid) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('現在地の座標:', position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.error('位置情報の取得エラー:', error);
          }
        );
      }
    }
  }, [user]);

  useEffect(() => {
    fetch('https://www.pronavi.online/railsapp/api/v1/users/index')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('ユーザーの取得エラー:', error));
  }, []);

  const handleButtonClick = () => {
    if (user) {
      window.location.assign('https://www.pronavi.online/status');
    } else {
      window.location.assign('https://www.pronavi.online/login');
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
  
  return (
    <div>
      <h1>ホームページ</h1>
      <p>これはホームページです。</p>
      {user && (
        <button onClick={handleButtonClick}>Statusページに移動</button>
      )}
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>ユーザー名</th>
            <th>部門ID</th>
            <th>ステータスID</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.User_id}>
              <td>{user.User_id}</td>
              <td>{user.User_name}</td>
              <td>{user.Department_id}</td>
              <td>{user.Status_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
