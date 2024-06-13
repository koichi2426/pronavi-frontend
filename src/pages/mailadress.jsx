import React, { useState } from 'react';
import MailHeader from '../components/MailHeader';
import { Box, Flex, Text, Input, Button } from '@yamada-ui/react';
import emailjs from 'emailjs-com';

const Mailadress = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      return data.status === 0; // 0 means registered
    } catch (error) {
      console.error('メールアドレスの確認中にエラーが発生しました', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = '以下はログイン用URLです。\nhttps://www.pronavi.online/login';

    const isRegistered = await checkEmailRegistered(email);

    if (isRegistered) {
      console.log('メールアドレスは登録されています。メールを送信します...');
      setErrorMessage('');
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { to_email: email, message },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
        .then((response) => {
          console.log('メールが送信されました', response.status, response.text);
        })
        .catch((error) => {
          console.error('メールの送信に失敗しました', error);
        });
    } else {
      console.log('メールアドレスは登録されていません。メールを送信しません。');
      setErrorMessage('未登録メールアドレスです。');
    }

    setEmail('');
  };

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
        <Text fontSize="20">メール送信ページ</Text>
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
            >
              送信
            </Button>
          </Flex>
        </form>
        {errorMessage && (
          <Text color="red" mt={4}>{errorMessage}</Text>
        )}
      </Box>
    </div>
  );
};

export default Mailadress;
