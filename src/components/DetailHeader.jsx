import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Box, Flex, Heading, Spacer, Button,Text } from '@yamada-ui/react';
import { useWindowSize } from "@uidotdev/usehooks";

const StHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const size = useWindowSize();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const textsize = size.width <= 425 ? '38px' : '70px';

  return (
    <Box as="header" bg="orange.50" p={2} position="fixed" w="100%" top="0" zIndex="1000">
      <Flex align="center">
        <Heading as="h3" size="lg">
          Pronavi
        </Heading>
        <Spacer />
        <Button variant="outline" onClick={toggleMenu}>
          ☰
        </Button>
      </Flex>
      {isMenuOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(211, 211, 211, 0.9)" // 薄い灰色の背景色
          zIndex="999"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={toggleMenu} position="absolute" top="10px" right="10px">
            ✕
          </Button>
          <nav>
            <Button as={Link} to="/" variant="link" color="black" _hover={{ color: 'green.500' }} display="block" p={5}>
            <Text fontSize={textsize}>在室確認</Text>
            </Button>
            <Button as={Link} to="/detail" variant="link" color="black" _hover={{ color: 'green.500' }} display="block" p={5}>
            <Text fontSize={textsize}>使い方</Text>
            </Button>
            <Button onClick={handleLogout} as={Link} to="/" variant="link" color="black" _hover={{ color: 'green.500' }} display="block" p={5}>
              <Text fontSize={textsize}>ログアウト</Text>
            </Button>
          </nav>
        </Box>
      )}
    </Box>
  );
}

export default StHeader;
