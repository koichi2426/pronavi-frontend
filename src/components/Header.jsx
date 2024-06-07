import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Input, Select } from '@yamada-ui/react';

const Header = () => {
  const [filter, setFilter] = useState('RD'); // フィルタリングオプションの初期値を設定

  // フィルタリングオプションが変更されたときの処理
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onSelectFilter(e.target.value);
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
            <Button as={Link} to="/login" variant="link" color="black" _hover={{ color: 'red.500' }}>
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
        <Spacer />
          <Select onChange={handleFilterChange} value={filter} maxW="100px" mt={1} ml={4}>
            {['RD', 'RB', 'RG'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Flex>
      </Box>

      <Box mt="20px" p={4}>
      </Box>
    </Box>
  );
}

export default Header;
