import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Input, Menu, MenuButton, MenuList, MenuItem, useMediaQuery, Tooltip } from '@yamada-ui/react';
import { useAuthContext } from '../context/AuthContext.jsx';
import customIcon from '../assets/custom-icon.svg'; // SVGファイルをインポート

const Header = ({ onFilterChange, onSearch }) => {
  const { user } = useAuthContext();
  const [selectedFilter, setSelectedFilter] = useState('1'); //selectedFilterはプルダウン時に読み取り
  const [selectedDepartment, setSelectedDepartment] = useState('RU');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedFilter = localStorage.getItem('selectedFilter');
    const savedDepartment = localStorage.getItem('selectedDepartment');
    if (savedFilter && savedDepartment) {
      setSelectedFilter(savedFilter);
      setSelectedDepartment(savedDepartment);
      onFilterChange(savedFilter);
    }
  }, [onFilterChange]);

  const handleFilterChange = (id, name) => {
    setSelectedFilter(id);
    setSelectedDepartment(name);
    setInputValue(''); // 変更時検索文字を削除処理
    onSearch('');
    onFilterChange(id);
    localStorage.setItem('selectedFilter', id);
    localStorage.setItem('selectedDepartment', name);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const forbiddenChars = /[&<>"'/*_% \\ -]/;

    if (forbiddenChars.test(value)) {
      setTooltipVisible(true);
      setTimeout(() => setTooltipVisible(false), 1500); // 表記の時間
    } else {
      setInputValue(value);
      onSearch(value);
    }
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
  const [isMobile] = useMediaQuery('(max-width: 600px)');

  return (
    <Box>
      <Box as="header" bg="orange.50" p={2} position="fixed" w="100%" top="0" zIndex="1000">
        <Flex align="center">
          <Heading as="h3" size="lg">
            Pronavi
          </Heading>
          <Heading as="h3" size="sm" ml={3} p={2}>
            在室確認システム
          </Heading>
          <Spacer />
          <nav>
            <Button
              as={Link}
              to={user ? "/status" : "/mailadress"}
              variant="link"
              color="black"
              _hover={{ color: 'green.500' }}
              fontSize="sm"
            >
              教員の方はこちら
            </Button>
          </nav>
        </Flex>
      </Box>
      <Box position="fixed" top="60px" w="100%" bg="white" p={1} zIndex="999" boxShadow="sm">
        <Flex justify={isLargerThan600 ? "space-around" : "space-between"} wrap="wrap">
          <Tooltip label="特殊文字は入力できません" isOpen={tooltipVisible}>
            <Input
              placeholder="全学系から検索"
              maxW={isLargerThan600 ? "400px" : "calc(100% - 110px)"}
              mr={2}
              variant="outline"
              borderColor="gray.300"
              focusBorderColor="gray.500"
              value={inputValue}
              onChange={handleSearchChange}
            />
          </Tooltip>
          <Menu>
            <MenuButton as={Button} rightIcon={<img src={customIcon} alt="custom icon" width="10px" height="10px" />}>
              {inputValue ? "全学系" : selectedDepartment}
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
      <Box mt="1px" p={3}>
      </Box>
    </Box>
  );
};

export default Header;
