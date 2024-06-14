import React, { useEffect, useState } from 'react'; // Reactライブラリと必要なフックをインポート
import { useNavigate } from 'react-router-dom'; // ルーティング用フックをインポート
import { signOut } from 'firebase/auth'; // Firebaseの認証関連の関数をインポート
import { auth } from '../firebase'; // Firebase設定をインポート
import { useAuthContext } from '../context/AuthContext'; // 認証コンテキストをインポート
import StHeader from '../components/StHeader';
import { Box, Flex, Button, Text } from '@yamada-ui/react';

const statusLegend = [
  { color: '#71BC78', description: '教授室', number: 1 }, // 淡い緑
  { color: '#F48FB1', description: '不在', number: 2 }, // 淡いピンク
  { color: '#FFB74D', description: '研究室', number: 3 }, // 淡いオレンジ
  { color: '#FFF176', description: '出張', number: 4 }, // 淡い黄色
  { color: '#64B5F6', description: '帰宅', number: 5 }, // 淡い青
  { color: '#B3E5FC', description: '対応不可', number: 6 }, // 淡い水色
];
 //stateの色と場所の設定

const Status = () => {
  const { user } = useAuthContext(); // 認証コンテキストからユーザー情報を取得
  const navigate = useNavigate(); // ページ遷移用のフックを取得
  const [userName, setUserName] = useState(''); // ユーザー名の状態を管理
  const [userStatus, setUserStatus] = useState(''); // ユーザーステータスの状態を管理

  useEffect(() => {
    // ユーザーがログインしている場合の処理
    if (user) {
      console.log('Logged in user:', user); // コンソールにユーザー情報を表示
      if (user.uid) {
        // ユーザーの位置情報を取得
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('Current coordinates:', position.coords.latitude, position.coords.longitude); // コンソールに位置情報を表示
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
              border="2px solid black" // ここでボタンを黒で縁取り
            >{/* state設定ボタンを表示 */}
              <Text fontSize="25">{status.description}</Text>
            </Button>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Status; // このコンポーネントをエクスポートして他の場所で使用可能にする
