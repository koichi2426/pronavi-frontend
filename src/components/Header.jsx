import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Input, Menu, MenuButton, MenuList, MenuItem, useMediaQuery } from '@yamada-ui/react';
import { useAuthContext } from '../context/AuthContext.jsx';

const Header = ({ onFilterChange, onSearch }) => {
  const { user } = useAuthContext();
  const [selectedFilter, setSelectedFilter] = useState('1'); //selectedFilterはプルダウン時に読み取り
  const [selectedDepartment, setSelectedDepartment] = useState('RU');

  const handleFilterChange = (id, name) => {
    setSelectedFilter(id);
    setSelectedDepartment(name);
    onFilterChange(id);
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const departmentMap = {
    '1': 'RU',
    '2': 'RB',
    '3': 'RD',
    '4': 'RE',
    '5': 'RM',
    '6': 'RG',
    '7': 'RL'
  };

  const [isLargerThan600] = useMediaQuery('(min-width: 1920px)');

  return (
    <Box>
      <Box as="header" bg="orange.50" p={2} position="fixed" w="100%" top="0" zIndex="1000">
        <Flex align="center">
          <Heading as="h3" size="lg">
            Pronavi
          </Heading>
          <Spacer />
          
          <nav>
            <Button
              as={Link}
              to={user ? "/status" : "/mailadress"}
              variant="link"
              color="black"
              _hover={{ color: 'green.500' }}
            >
              教授の方はこちら
            </Button>
          </nav>
        </Flex>
      </Box>
      <Box position="fixed" top="60px" w="100%" bg="white" p={1} zIndex="999" boxShadow="sm">
        <Flex justify={isLargerThan600 ? "space-around" : "space-between"} wrap="wrap">
          <Input
            placeholder="名前検索"
            maxW={isLargerThan600 ? "400px" : "calc(100% - 130px)"}
            mr={2}
            variant="outline"
            borderColor="gray.300"
            focusBorderColor="gray.500"
            onChange={handleSearchChange} 
          />
          <Menu>
            <MenuButton as={Button} rightIcon="⇩">
              {selectedDepartment}
            </MenuButton>
            <MenuList>
              {Object.entries(departmentMap).map(([id, name]) => (
                <MenuItem key={id} onClick={() => handleFilterChange(id, name)}>
                  {name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      <Box mt="10px" p={4}>
      </Box>
    </Box>
  );
};

export default Header;
