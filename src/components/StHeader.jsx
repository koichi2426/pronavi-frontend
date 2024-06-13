import React from 'react'
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Box, Flex, Heading, Spacer, Button,Text} from '@yamada-ui/react';

const StHeader = () => {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    
      <Box as="header" bg="orange.50" p={2} position="fixed" w="100%" top="0" zIndex="1000">
        <Flex align="center">
          <Heading as="h3" size="lg">
            Pronavi
          </Heading>   
          <Spacer />
          <nav>
            <Button onClick={handleLogout} as={Link} to="/" variant="link" color = "black" _hover = {{ color: 'green.500' }} mr={5}>
              ログアウト
            </Button >
            
            <Button as={Link} to="/" variant="link" color="black" _hover={{ color: 'green.500' }}>
              在室確認
            </Button>
          </nav>
        </Flex>
      </Box>
  )
}

export default StHeader