import React from 'react';
import { Text, Flex, Box } from '@yamada-ui/react';
import { people } from '../data'; // データをインポート

const Home = () => {
  // フィルタリング設定
  const filteredPeople = people.filter(person => person.Department_id === '1');

  return (
    <Box p={4}>
      {filteredPeople.map((person, index) => (
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

// 色の定義
const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return '#038744'; // 教授室
    case 2:
      return '#D80147'; // 不在
    case 3:
      return '#ED791D'; // 研究室
    case 4:
      return '#FFE501'; // 出張
    case 5:
      return '#02518E'; // 帰宅
    case 6:
      return '#7FCCEC'; // private
    default:
      return 'gray'; //その他
  }
};

export default Home;
