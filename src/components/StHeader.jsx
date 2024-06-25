import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Box, Flex, Heading, Spacer, Button, Text } from '@yamada-ui/react';

const StHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
        <Box mt={2} textAlign="right">
          <nav>
            <Button onClick={handleLogout} as={Link} to="/" variant="link" color="black" _hover={{ color: 'green.500' }} display="block" mb={2}>
              ログアウト
            </Button>
            <Button as={Link} to="/" variant="link" color="black" _hover={{ color: 'green.500' }} display="block">
              在室確認
            </Button>
          </nav>
        </Box>
      )}
    </Box>
  );
}

export default StHeader;
