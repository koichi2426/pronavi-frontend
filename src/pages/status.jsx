import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import StHeader from '../components/StHeader';
import { Box, Flex, Button, Text } from '@yamada-ui/react';

const statusLegend = [
  { color: '#038744', description: '教授室', number: 0 },
  { color: '#D80147', description: '不在', number: 1 },
  { color: '#ED791D', description: '研究室', number: 2 },
  { color: '#FFE501', description: '出張', number: 3 },
  { color: '#02518E', description: '帰宅', number: 4 },
  { color: '#7FCCEC', description: 'private', number: 5 },
];

const Status = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState("不在");

  useEffect(() => {
    if (user) {
      console.log('Logged in user:', user);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleStatusChange = (status) => {
    setCurrentStatus(status.description);
  };

  return (
    <div>
      <StHeader />
      <Box
        position="fixed"
        top="150px"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="gray.10"
        p={1}
        zIndex="999"
        textAlign="center"
      >
        <Text fontSize="80">{currentStatus}</Text>
      </Box>

      <Box
        position="fixed"
        top="400px"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="gray.10"
        p={1}
        zIndex="999"
        width="100%"
      >
        <Flex
          justify="center"
          align="center"
          wrap="wrap"
          className="status-container"
        >
          {statusLegend.map((status, index) => (
            <Button
              key={index}
              onClick={() => handleStatusChange(status)}
              bg={status.color}
              color="black"
              width="120px"
              height="100px"
              m="10px"
              _hover={{ color: 'green.500' }}
              className="status-button"
            >
              {status.description}
            </Button>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Status;
