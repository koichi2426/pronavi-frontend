import React, { useEffect, useState } from 'react'; // Reactライブラリと必要なフックをインポート
import { Text, Flex, Box } from '@yamada-ui/react';
import { people } from '../data'; // データインポート
import { useAuthContext } from '../context/AuthContext'; // 認証コンテキストをインポート

const Home = ({ selectedFilter }) => {

  // ユーザー情報を保持するための状態と関数を定義
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext(); // 認証コンテキストからユーザー情報を取得

  useEffect(() => {
    // ユーザーがログインしている場合の処理
    if (user) {
      console.log('現在のユーザー:', user); // コンソールにユーザー情報を表示
      if (user.uid) {
        // ユーザーの位置情報を取得
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('現在地の座標:', position.coords.latitude, position.coords.longitude); // コンソールに位置情報を表示
          },
          error => {
            console.error('位置情報の取得エラー:', error); // 位置情報の取得エラーを表示
          }
        );
      }
    }
  }, [user]); // userが変更されるたびにこのエフェクトが実行される

  useEffect(() => {
    // APIからユーザーリストを取得
    fetch('http://133.14.14.13/railsapp/api/v1/users/index')
      .then(response => response.json()) // レスポンスをJSON形式に変換
      .then(data => setUsers(data)) // 取得したデータをusers状態にセット
      .catch(error => console.error('ユーザーの取得エラー:', error)); // エラーが発生した場合にコンソールに表示
  }, []); // このエフェクトはコンポーネントの初回レンダリング時に一度だけ実行される

  const handleButtonClick = () => {
    // ユーザーがログインしているかどうかで遷移先を変更
    if (user) {
      window.location.assign('http://133.14.14.13/status'); // ログインしている場合はステータスページへ
    } else {
      window.location.assign('http://133.14.14.13/login'); // ログインしていない場合はログインページへ
    }
  };





  // フィルタリング
  const filteredProfessors = people.filter(person => person.Department_id === selectedFilter);

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return '教授室';
      case 2:
        return '学内';
      case 3:
        return '研究室';
      case 4:
        return '出張';
      case 5:
        return '帰宅';
      case 6:
        return '対応不可';
      default:
        return 'その他';
    }
  };

  // 背景色
  const getBackgroundColor = (status) => {
    if (status === 5 || status === 4 || status === 6) {
      return 'gray.300';
    }
    return 'lightgreen';
  };

  return (
    <Flex flexWrap="wrap" p={6}>
      {filteredProfessors.map((professor, index) => (
        <Box
          key={index}
          mr={10}
          mb={4}
          display="flex"
          alignItems="center"
          width="200px"
          height="45px"
          borderRadius="25px"
          bg={getBackgroundColor(professor.Status_id)}
          padding="0 8px" // paddingを追加
        >
          <Text width="auto" maxWidth="116px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {professor.username}
          </Text>
          <Text ml="auto" fontWeight="bold">{getStatusText(professor.Status_id)}</Text>
        </Box>
      ))}
    </Flex>
  );
};

export default Home;
