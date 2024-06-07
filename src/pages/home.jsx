import React from 'react';
import { Text, Flex, Box } from '@yamada-ui/react';
import { people } from '../data'; // データをインポート

const Home = () => {
  const filteredPeople = people.filter(person => person.Department_id === '1');

  return (
    <Flex flexWrap="wrap" p={6}>
      {filteredPeople.map((person, index) => (
        <Box
          key={index}
          mr={10}
          mb={4}
          display="flex"
          alignItems="center"
          width="200px"
          height="45px"
          borderRadius="25px"
          bg={getBackgroundColor(person.Status_id)}
          padding="0 8px" // paddingを追加
        >
          <Text width="auto" maxWidth="116px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {person.username}
          </Text>
          <Text ml="auto" fontWeight="bold">{getStatusText(person.Status_id)}</Text>
        </Box>
      ))}
    </Flex>
  );
};

// ステータスの文字を取得
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

// 背景色の定義
const getBackgroundColor = (status) => {
  if (status === 5 || status === 4 || status === 6) {
    return 'gray.300';
  }
  return 'lightgreen';
};

export default Home;
