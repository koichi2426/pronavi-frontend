import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Input, Checkbox } from '@yamada-ui/react';

const Header = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('1'); // フィルタリングオプションの初期値を設定

  // フィルタリングオプションが変更されたときの処理
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter); // フィルターが変更されたときにコールバック関数を呼び出す
  };

  // 部署のIDと表示名のマッピング
  const departmentMap = {
    '1': 'RU',
    '2': 'RB',
    '3': 'RD',
    '4': 'RE',
    '5': 'RM',
    '6': 'RG',
    '7': 'RL'
  };

  return (
    <Box>
      <Box as="header" bg="orange.50" p={2} position="fixed" w="100%" top="0" zIndex="1000">
        <Flex align="center">
          <Heading as="h3" size="lg">
            Pronavi
          </Heading>
          <Spacer />
          <Input
            placeholder="名前検索"
            maxW="300px"
            mr={4}
            variant="outline"
            borderColor="gray.300"
            focusBorderColor="gray.500"
          />
          <nav>
            <Button as={Link} to="/login" variant="link" color="black" _hover={{ color: 'green.500' }}>
              教授の方はこちら
            </Button>
          </nav>
        </Flex>
      </Box>
      {/* ステータスバー部分 */}
      <Box
        position="fixed"
        top="55px"
        w="100%"
        bg="white"
        p={1}
        zIndex="999"
        boxShadow="sm"
      >
        <Flex justify="space-around" wrap="wrap">
          {Object.entries(departmentMap).map(([id, name]) => (
            <Checkbox
              key={id}
              isChecked={selectedFilter === id}
              onChange={() => handleFilterChange(id)}
            >
              {name}
            </Checkbox>
          ))}
        </Flex>
      </Box>

      <Box mt="2px" p={4}>
      </Box>
    </Box>
  );
}

export default Header;
