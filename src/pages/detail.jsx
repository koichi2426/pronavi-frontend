import React from 'react';
import { Box, Text, Image } from '@yamada-ui/react';
import MailHeader from '../components/MailHeader';
import des1Image from '../assets/material/des1.png'; 
import des2Image from '../assets/material/des2.png'; 
import des3Image from '../assets/material/des3.png'; 
import '../Detail.css';
const Detail = () => {
  return (
    <div>
      <MailHeader />
      <Box p={4} mt="50px">
        <Box mt={4}>
          <Text className="text-lg-custom">アプリを利用する前に。</Text>
          <Text className="text-2xl-custom">アプリをホームボタンに追加し、すぐに使えるようにしましょう。</Text>
        </Box>
        <hr className="gray-line" />
        <Box mt={4}>
          <Text className="text-xl-custom">ホームボタンに追加する。</Text>
          <Text className="text-2xl-custom">1.フッター中央にある📤を押します。</Text>
          <Image 
            src={des1Image} 
            alt="description1"
            maxWidth="300px"
            height="auto" 
            borderRadius="20px"
            mt={4}
          />
        </Box>
        <Box mt={4}>
          <Text className="text-2xl-custom">2.下にスクロールし、「ホームボタンに追加」を選択します。</Text>
          <Image 
            src={des2Image} 
            alt="description2"
            maxWidth="300px" 
            height="auto" 
            borderRadius="20px" 
            mt={4}
          />
        </Box>
        <Box mt={4}>
          <Text className="text-2xl-custom">3.画面右上の「追加」を選択します。これによりホーム画面に追加されます。</Text>
          <Image 
            src={des3Image} 
            alt="description3"
            maxWidth="300px"
            height="auto"
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
