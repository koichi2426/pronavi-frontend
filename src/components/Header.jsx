import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Spacer, Button, Input } from '@yamada-ui/react';

const Header = () => {
  return (
    <Box as="header" bg="orange.200" p={2} position="fixed" w="100%">
      <Flex align="center">
        <Heading as="h3" size="lg">
          Pronavi
        </Heading>
        <Spacer />
        <Input
          placeholder="検索"
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
  );
}

export default Header;
