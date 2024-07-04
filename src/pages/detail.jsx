import React from 'react';
import { Box, Text, Image } from '@yamada-ui/react';
import MailHeader from '../components/MailHeader';
import des1Image from '../assets/material/logout.png'; 
import des2Image from '../assets/material/sendmailaddress.png'; 
import des3Image from '../assets/material/login.png'; 
import des4Image from '../assets/material/addHome.png'; 
import des5Image from '../assets/material/editname.png'; 
import '../Detail.css';

const Detail = () => {
  return (
    <div>
      <MailHeader />
      <Box p={4} mt="50px">
        <Box mt={4}>
          <Text className="text-lg-custom">アプリを利用する前に。</Text>
          <Text className="text-2xl-custom">アプリをホーム画面に追加し、すぐに使えるようにしましょう。</Text>
        </Box>
        <hr className="gray-line" />
        <Box mt={4}>
          <Text className="text-xl-custom">ホーム画面に追加する。</Text>
          <Text className="text-2xl-custom">1.画面右上のメニューから、「ログアウト」を選択します。</Text>
          <Image 
            src={des1Image} 
            alt="description1"
            className="responsive-image"
            borderRadius="20px"
            mt={4}
          />
        </Box>
        <Box mt={4}>
          <Text className="text-2xl-custom">2.「教員の方はこちら」から、登録したメールアドレスを入力し、「送信」を押します。</Text>
          <Image 
            src={des2Image} 
            alt="description2"
            className="responsive-image"
            borderRadius="20px" 
            mt={4}
          />
        </Box>
        <Box mt={4}>
          <Text className="text-2xl-custom">3.ログイン用URLが記載されたメールから、URLを開き、フッター中央にある📤を押します。</Text>
          <Image 
            src={des3Image} 
            alt="description3"
            className="responsive-image"
            borderRadius="20px"
            mt={4}
          />
        </Box>
        <Box mt={4}>
          <Text className="text-2xl-custom">4.下にスクロールし、「ホーム画面に追加」を選択します。</Text>
          <Image 
            src={des4Image} 
            alt="description4"
            className="responsive-image"
            borderRadius="20px"
            mt={4}
          />
        </Box>
        <Box mt={4}>
          <Text className="text-2xl-custom">
            5.名前を変更し「追加」を押します。
            これで、ホーム画面に追加されます。
          </Text>
          <Image 
            src={des5Image} 
            alt="description5"
            className="responsive-image"
            borderRadius="20px"
            mt={4}
          />
        </Box>
      </Box>
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
      </Box>
    </div>
  );
};

export default Detail;
