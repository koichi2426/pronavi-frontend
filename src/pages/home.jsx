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
            console.error('位置情報の取得エラー:', error);
          }
        );
      }
    }
  }, [user]);

  useEffect(() => {
    fetch('http://133.14.14.13/railsapp/api/v1/users/index')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('ユーザーの取得エラー:', error));
  }, []);

  const handleButtonClick = () => {
    if (user) {
      window.location.assign('http://133.14.14.13/status');
    } else {
      window.location.assign('http://133.14.14.13/login');
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
