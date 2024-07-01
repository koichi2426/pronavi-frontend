import React, { useState, useEffect } from 'react';
import MailHeader from '../components/MailHeader';
import { Box, Flex, Text, Input, Button } from '@yamada-ui/react';
import emailjs from 'emailjs-com';

const Mailadress = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // スピナーの状態を追加
  const [users, setUsers] = useState([]);

  const checkEmailRegistered = async (email) => {
    try {
      const response = await fetch('https://www.pronavi.online/railsapp/api/v1/users/check_mailaddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mailaddress: email }),
      });

      const data = await response.json();
      console.log(data);
      return data.status === 1; // 1 means registered
    } catch (error) {
      console.error('メールアドレスの確認中にエラーが発生しました', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const isRegistered = await checkEmailRegistered(email);

    if (isRegistered) {
      const user = users.find(user => user.Mailaddress === email);
      if (user) {
        const loginUrl = `https://www.pronavi.online/login?uid=${user.User_id}`;
        const message = `以下はログイン用URLです。\n${loginUrl}\n\nより使いやすくしてもらうために、教員用スマートフォンのホーム画面にこちらのURLのショートカットを追加することをお勧めします。詳しくは教員用ページの「使い方」で確認ください。`;

        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          { to_email: email, message },
          import.meta.env.VITE_EMAILJS_USER_ID
        )
          .then((response) => {
            console.log('メールが送信されました', response.status, response.text);
            setSuccessMessage('メールが送信されました。');
          })
          .catch((error) => {
            console.error('メールの送信に失敗しました', error);
            setErrorMessage('メールの送信に失敗しました。');
          });
      } else {
        setErrorMessage('ユーザー情報が見つかりません。');
      }
    } else {
      setErrorMessage('未登録メールアドレスです。');
    }

    setEmail('');
    setIsLoading(false); // スピナーを非表示
  };

  useEffect(() => {
    fetch('https://www.pronavi.online/railsapp/api/v1/users/index')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('ユーザーの取得エラー:', error));
  }, []);

  return (
    <div>
      <MailHeader />
      <Box
        position="fixed"
        top="120px"
        left="50%"
        transform="translate(-50%, 0)"
        bg="gray.10"
        p={4}
        zIndex="10"
        textAlign="center"
      >
        <Text fontSize="20">登録済みメールアドレスの入力</Text>
      </Box>
      <Box
        position="fixed"
        top="200px"
        left="50%"
        transform="translate(-50%, 0)"
        bg="gray.10"
        p={4}
        zIndex="10"
        textAlign="center"
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={4}>
            <Input
              type="email"
              placeholder="メールアドレス"
              bg="white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              colorScheme="blue"
              bg="#64B5F6"
              color="black"
              border="1px solid black"
              disabled={isLoading} // スピナーが表示されている間はボタンを無効化
            >
              {isLoading ? <div className="spinner"></div> : '送信'}
            </Button>
          </Flex>
        </form>
        {errorMessage && (
          <Text color="red" mt={4}>{errorMessage}</Text>
        )}
        {successMessage && (
          <Text color="green" mt={4}>{successMessage}</Text>
        )}
      </Box>
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #64B5F6;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Mailadress;
