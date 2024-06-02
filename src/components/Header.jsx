import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Input, Text, Select } from '@yamada-ui/react';

// ステータスの色と説明の定義
const statusLegend = [
  { color: '#038744', description: '教授室' },
  { color: '#D80147', description: '不在' },
  { color: '#ED791D', description: '研究室' },
  { color: '#FFE501', description: '出張' },
  { color: '#02518E', description: '帰宅' },
  { color: '#7FCCEC', description: 'private' },
];

const Header = () => {
  const [filter, setFilter] = useState('RD'); // フィルタリングオプションの初期値を設定

  // フィルタリングオプションが変更されたときの処理
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onSelectFilter(e.target.value);
  };

  return (
    <Box>
      <Box as="header" bg="orange.100" p={2} position="fixed" w="100%" top="0" zIndex="1000">
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
        top="60px"
        w="100%"
        bg="gray.10"
        p={1}
        zIndex="999"
        boxShadow="sm"
      >
        <Flex justify="space-between" wrap="wrap">

          {/* ステータスの色と説明を表示 */}
          {statusLegend.map((status, index) => (
            <Flex key={index} align="center" m={1}>
              <Box
                w={3}
                h={3}
                borderRadius="50%"
                bg={status.color}
                mr={2}
              />
              <Text fontSize="sm">{status.description}</Text>
            </Flex>
          ))}
          {/* フィルタリングのプルダウンメニュー */}
          <Select onChange={handleFilterChange} value={filter} maxW="100px" mt={1} ml={4}>
          {['RD', 'RB', 'RG'].map((option) => (
          <option key={option} value={option}>
          {option}
          </option>
           ))}
          </Select>
          
        </Flex>
      </Box>

      {/* コンテンツの開始位置を調整 */}
      <Box mt="1px" p={4}>
      </Box>
    </Box>
  );
}

export default Header;
