import React from 'react';
import { Text, Flex, Box } from '@yamada-ui/react';
import { people } from '../data'; // データインポート

const Home = ({ selectedFilter }) => {

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
