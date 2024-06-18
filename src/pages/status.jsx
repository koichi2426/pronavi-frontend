import React, { useEffect, useState } from 'react'; // Reactライブラリと必要なフックをインポート
import { useNavigate } from 'react-router-dom'; // ルーティング用フックをインポート
import { signOut } from 'firebase/auth'; // Firebaseの認証関連の関数をインポート
import { auth } from '../firebase'; // Firebase設定をインポート
import { useAuthContext } from '../context/AuthContext'; // 認証コンテキストをインポート
import StHeader from '../components/StHeader';
import { Box, Flex, Button, Text } from '@yamada-ui/react';

const statusLegend = [
  { color: '#71BC78', description: '教員室', number: 1 }, // 淡い緑
  { color: '#F48FB1', description: '学内', number: 2 }, // 淡いピンク
  { color: '#FFB74D', description: '研究室', number: 3 }, // 淡いオレンジ
  { color: '#FFF176', description: '出張', number: 4 }, // 淡い黄色
  { color: '#64B5F6', description: '帰宅', number: 5 }, // 淡い青
  { color: '#B3E5FC', description: '対応不可', number: 6 }, // 淡い水色
]; // stateの色と場所の設定

const UNIVERSITY_LATITUDE_RANGE = [35.981615, 35.988737];
const UNIVERSITY_LONGITUDE_RANGE = [139.368220, 139.376497];

const Status = () => {
  const { user } = useAuthContext(); // 認証コンテキストからユーザー情報を取得
  const navigate = useNavigate(); // ページ遷移用のフックを取得
  const [userName, setUserName] = useState(''); // ユーザー名の状態を管理
  const [userStatus, setUserStatus] = useState(''); // ユーザーステータスの状態を管理
  const [location, setLocation] = useState(null);
  const ipInfoApiKey = import.meta.env.VITE_IPINFO_API_KEY; // 環境変数からAPIキーを取得

  useEffect(() => {
    // ユーザーがログインしている場合の処理
    if (user) {
      console.log('Logged in user:', user); // コンソールにユーザー情報を表示
      if (user.uid) {
        // ユーザーの位置情報を取得
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('Current coordinates:', position.coords.latitude, position.coords.longitude); // コンソールに位置情報を表示
            const universityBoolean =
              position.coords.latitude >= UNIVERSITY_LATITUDE_RANGE[0] &&
              position.coords.latitude <= UNIVERSITY_LATITUDE_RANGE[1] &&
              position.coords.longitude >= UNIVERSITY_LONGITUDE_RANGE[0] &&
              position.coords.longitude <= UNIVERSITY_LONGITUDE_RANGE[1]
                ? 1
                : 0;
            updateLocationStatus(universityBoolean); // 位置情報のステータスを更新
          },
          error => {
            console.error('Error getting location:', error); // 位置情報の取得エラーを表示
          }
        );
      }
      // ユーザーデータを取得
      fetchUserData(user.uid);
    }
  }, [user]); // userが変更されるたびにこのエフェクトが実行される

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch('https://www.pronavi.online/railsapp/api/v1/users/index'); // ユーザーデータを取得するAPI呼び出し
      const data = await response.json(); // レスポンスをJSON形式に変換
      const currentUser = data.find(u => u.User_id === userId); // ユーザーIDで一致するユーザーを検索
      if (currentUser) {
        setUserName(currentUser.User_name); // ユーザー名をセット
        setUserStatus(getStatusDescription(currentUser.Status_id)); // ユーザーステータスをセット
      } else {
        setUserName('none'); // ユーザーが見つからなかった場合のデフォルト値
        setUserStatus('none'); // ステータスが見つからなかった場合のデフォルト値
      }
    } catch (error) {
      console.error('Error fetching user data:', error); // データ取得エラーを表示
      setUserName('none'); // エラー時のデフォルト値
      setUserStatus('none'); // エラー時のデフォルト値
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebaseからサインアウト
      navigate('/'); // ログアウト後にホームページにリダイレクト
    } catch (error) {
      console.error('Error signing out:', error); // サインアウトエラーを表示
    }
  };

  const updateLocationStatus = async (universityBoolean) => {
    if (user) {
      try {
        const response = await fetch(`https://www.pronavi.online/railsapp/api/v1/users/locations`, {
          method: 'PATCH', // PATCHメソッドを使用して位置情報を更新
          headers: {
            'Content-Type': 'application/json', // JSON形式のリクエストヘッダー
          },
          body: JSON.stringify({
            user_id: user.uid,
            location: {
              university_boolean: universityBoolean.toString(),
            },
          }),
        });
        const result = await response.json();
        if (result.status !== 'success') {
          console.error('Failed to update location status'); // 位置情報更新失敗メッセージ
        }
      } catch (error) {
        console.error('Error updating location status:', error); // 位置情報更新エラーを表示
      }
    }
  };

  const updateStatus = async (statusDescription) => {
    if (user) {
      try {
        const statusId = getStatusId(statusDescription); // 状態の説明からIDを取得
        const response = await fetch(`https://www.pronavi.online/railsapp/api/v1/users/${user.uid}/schedules`, {
          method: 'PATCH', // PATCHメソッドを使用してステータスを更新
          headers: {
            'Content-Type': 'application/json', // JSON形式のリクエストヘッダー
          },
          body: JSON.stringify({
            schedule: {
              status_id: statusId, // 更新するステータスID
            },
          }),
        });
        const result = await response.json(); // レスポンスをJSON形式に変換
        if (result.update) {
          console.log(`Status updated to ${statusDescription}`); // ステータス更新成功メッセージ
          setUserStatus(statusDescription); // ローカルのステータスを更新
        } else {
          console.error('Failed to update status'); // ステータス更新失敗メッセージ
        }
      } catch (error) {
        console.error('Error updating status:', error); // ステータス更新エラーを表示
      }
    }
  };

  const handleHomeClick = () => {
    window.location.href = '/'; // ホームページに移動
  };

  const getStatusDescription = (statusId) => {
    const status = statusLegend.find(s => s.number === statusId);
    return status ? status.description : 'Unknown';
  };

  const getStatusId = (statusDescription) => {
    const status = statusLegend.find(s => s.description === statusDescription);
    return status ? status.number : -1;
  };

  useEffect(() => {
    if (user) {
      if (user.uid) {
        // IPアドレスを取得してコンソールに表示し、VPNステータスを確認
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
            console.log('IP Address:', data.ip); // コンソールに表示
            checkVpnStatusAndLocation(data.ip); // VPNステータスと位置情報を確認
          })
          .catch(error => {
            console.error('Error fetching IP address:', error);
          });
      }
    }
  }, [user, location]);

  useEffect(() => {
    // 位置情報を取得して状態に保存
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log('Location:', { latitude, longitude }); // 位置情報をコンソールに表示
      },
      error => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  const checkVpnStatusAndLocation = (ip) => {
    fetch(`https://ipinfo.io/${ip}/json?token=${ipInfoApiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.hostname && data.hostname.includes('vpn')) {
          console.log('VPN Status: Connected'); // VPN接続を表示
          if (location) {
            const { latitude, longitude } = location;
            if (
              latitude >= UNIVERSITY_LATITUDE_RANGE[0] &&
              latitude <= UNIVERSITY_LATITUDE_RANGE[1] &&
              longitude >= UNIVERSITY_LONGITUDE_RANGE[0] &&
              longitude <= UNIVERSITY_LONGITUDE_RANGE[1]
            ) {
              console.log("大学内 (VPN接続)");
              isIn(1); // 大学内にいる場合
            } else {
              console.log("大学外 (VPN接続)");
              isIn(0); // 大学外にいる場合
            }
          }
        } else {
          console.log('VPN Status: Not Connected'); // VPN非接続を表示
          if (ip.startsWith('133.14')) {
            console.log("大学内");
            isIn(1); // 大学内にいる場合
          } else {
            console.log("大学外");
            isIn(0); // 大学外にいる場合
          }
        }
      })
      .catch(error => {
        console.error('Error fetching VPN status:', error);
      });
  };

  const isIn = async (universityBoolean) => {
    if (user) {
      try {
        const response = await fetch(`https://www.pronavi.online/railsapp/api/v1/users/locations`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.uid,
            location: {
              university_boolean: universityBoolean.toString(),
            },
          }),
        });
        const result = await response.json();
        if (result.status !== 'success') {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  // ユーザーがログインしていない場合の表示
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
      <StHeader />{/* ヘッダーを表示 */}
      <Box
        position="fixed"
        top="150px"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="gray.10"
        p={1}
        zIndex="999"
        textAlign="center"
      >
        <Text fontSize="20">{userName && <p>Logged in as: <strong>{userName}</strong></p>}</Text> {/* ログインしているユーザー名を表示 */}
        <Text fontSize="70">{userStatus !== '' && userStatus}</Text> {/* 現在のステータスを文字列で表示 */}
      </Box>
      <Box
        position="fixed"
        top="500px"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="gray.10"
        p={1}
        zIndex="999"
        width="100%"
      >
        <Flex
          justify="center"
          align="center"
          wrap="wrap"
          className="status-container"
        >
          {statusLegend.map((status, index) => (
            <Button
              key={index}
              onClick={() => updateStatus(status.description)}
              bg={status.color}
              color="black"
              width="120px"
              height="100px"
              m="20px"
              _hover={{ color: 'green.500' }}
              className="status-button"
              border="2px solid black"
            >
              <Text fontSize="25">{status.description}</Text>
            </Button>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Status;