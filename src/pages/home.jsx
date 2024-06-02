import React from 'react';
import { Text, Flex, Box } from '@yamada-ui/react';
import { people } from '../data';

const Home = () => {

  const filteredPeople = people.filter(person => person.Department_id === '1');

  return (
    <Flex flexWrap="wrap" p={6}>
      {filteredPeople.map((person, index) => (
        <Box
          key={index}
          mr={4}
          mb={4}
          display="flex"
          alignItems="center"
          width="200px"
          height="40px"
          borderRadius="25px"
          bg={getBackgroundColor(person.Status_id)}
        >
          <Box
            w={3}
            h={3}
            borderRadius="50%"
            bg={getStatusColor(person.Status_id)}
            mr={2}
            ml={2} // Added margin-left to create space
          />
          <Text width="auto" maxWidth="170px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {person.username}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

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
      return 'gray'; // その他
  }
};


// 背景色の定義
const getBackgroundColor = (status) => {
  if (status === 5 || status === 4 || status === 6) {
    return 'gray';
  }
  return 'blue.100';
};

export default Home;
