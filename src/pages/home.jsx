import React, { useEffect, useState } from 'react';
import { Text, Flex, Box } from '@yamada-ui/react';
import { useAuthContext } from '../context/AuthContext'; // 認証コンテキストをインポート

const UNIVERSITY_LATITUDE_RANGE = [35.981615, 35.988737];
const UNIVERSITY_LONGITUDE_RANGE = [139.368220, 139.376497];

const Home = ({ selectedFilter }) => {
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    fetch('https://www.pronavi.online/railsapp/api/v1/users/index')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('ユーザーの取得エラー:', error));
  }, []);

  useEffect(() => {
    if (user) {
      if (user.uid) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            if (
              latitude >= UNIVERSITY_LATITUDE_RANGE[0] &&
              latitude <= UNIVERSITY_LATITUDE_RANGE[1] &&
              longitude >= UNIVERSITY_LONGITUDE_RANGE[0] &&
              longitude <= UNIVERSITY_LONGITUDE_RANGE[1]
            ) {
              updateStatus(1);
            } else {
              updateStatus(4);
            }
          },
          error => {
            console.error('Error getting location:', error);
          }
        );
      }
    }
  }, [user]);

  const updateStatus = async (statusId) => {
    if (user) {
      try {
        const response = await fetch(`https://www.pronavi.online/railsapp/api/v1/users/${user.uid}/schedules`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            schedule: {
              status_id: statusId,
            },
          }),
        });
        const result = await response.json();
        if (!result.update) {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const filteredProfessors = users.filter(user => user.Department_id.toString() === selectedFilter);

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return '教授室';
      case 2:
        return '学内';
      case 3:
        return '研究室';
      case 4:
        return '出張';
      case 5:
        return '帰宅';
      case 6:
        return '対応不可';
      default:
        return 'その他';
    }
  };

  const getBackgroundColor = (status) => {
    if (status === 5 || status === 4 || status === 6) {
      return 'gray.300';
    }
    return 'lightgreen';
  };

  return (
    <Flex flexWrap="wrap" p={6}>
      {filteredProfessors.map((professor, index) => (
        <Box
          key={index}
          mr={10}
          mb={4}
          display="flex"
          alignItems="center"
          width="200px"
          height="45px"
          borderRadius="25px"
          bg={getBackgroundColor(professor.Status_id)}
          padding="0 8px"
        >
          <Text width="auto" maxWidth="116px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {professor.User_name}
          </Text>
          <Text ml="auto" fontWeight="bold">{getStatusText(professor.Status_id)}</Text>
        </Box>
      ))}
    </Flex>
  );
};

export default Home;
