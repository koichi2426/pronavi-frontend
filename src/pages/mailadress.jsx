import React, { useState } from 'react';
import MailHeader from '../components/MailHeader';
import { Box, Flex, Text, Input, Button } from '@yamada-ui/react';
import emailjs from 'emailjs-com';

const Mailadress = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = '以下はログイン用URLです。\nhttps://www.pronavi.online/login';

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
      </Box>
    </div>
  );
};

export default Mailadress;
