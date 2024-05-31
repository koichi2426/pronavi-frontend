import React from 'react';
import { Box, Flex, Text } from '@yamada-ui/react';

// ステータスデータ
const people = [
  { username: '山田 太郎', Department_id: '1', Status_id: 1 },
  { username: '鈴木 花子', Department_id: '2', Status_id: 2 },
];

// ステータスの色を定義
const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return 'red';
    case 2:
      return 'blue';
    default:
      return 'gray';
  }
};

const Home = () => {
  return (
    <Box p={4}>
      {people.map((person, index) => (
        <Flex key={index} align="center" mb={2}>
          <Box
            w={3}
            h={3}
            borderRadius="50%"
            bg={getStatusColor(person.Status_id)}
            mr={2}
          />
          <Text>{person.username}</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default Home;
