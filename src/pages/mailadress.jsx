import React, { useState } from 'react'; // Reactライブラリと必要なフックをインポート
import MailHeader from '../components/MailHeader'; // MailHeaderコンポーネントをインポート
import { Box, Flex, Text, Input, Textarea, Button } from '@yamada-ui/react'; // Yamada UIのコンポーネントをインポート

const Mailadress = () => {
  // フォーム入力の状態管理
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // メール送信ロジックをここに追加
    console.log('Sending email', { email});

    // フォームのリセット
    setEmail('');
  };

  return (
    <div>
      <MailHeader /> {/* ヘッダーを表示 */}
      <Box
        position="fixed"
        top="120px"
        left="50%"
        transform="translate(-50%, 0)" // 水平方向に中央揃え
        bg="gray.10" // 背景色を微調整
        p={4} // パディングを調整
        zIndex="10" // 適切なz-indexを設定
        textAlign="center"
      >
        <Text fontSize="20">メール送信ページ</Text>
      </Box>
      <Box
        position="fixed"
        top="200px"
        left="50%"
        transform="translate(-50%, 0)" // 水平方向に中央揃え
        bg="gray.10" // 背景色を微調整
        p={4} // パディングを調整
        zIndex="10" // 適切なz-indexを設定
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

export default Mailadress; // このコンポーネントをエクスポートして他の場所で使用可能にする
