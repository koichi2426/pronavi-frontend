import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthContext } from '../context/AuthContext';
import StHeader from '../components/StHeader';
import { Box, Flex, Button, Text, Modal, Input } from '@yamada-ui/react';
import { useWindowSize } from "@uidotdev/usehooks";

const statusLegend = [
  { color: '#71BC78', description: '教員室', number: 1 },
  { color: '#F48FB1', description: '学内', number: 2 },
  { color: '#FFB74D', description: '研究室', number: 3 },
  { color: '#FFF176', description: '出張', number: 4 },
  { color: '#64B5F6', description: '帰宅', number: 5 },
  { color: '#B3E5FC', description: '対応不可', number: 6 },
];

const UNIVERSITY_LATITUDE_RANGE = [35.981615, 35.988737];
const UNIVERSITY_LONGITUDE_RANGE = [139.368220, 139.376497];

const Status = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [location, setLocation] = useState(null);
  const ipInfoApiKey = import.meta.env.VITE_IPINFO_API_KEY;
  const size = useWindowSize();
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [statusText, setStatusText] = useState('');

  {/* ポップアップメニューの開閉 */}
  const openModal = () => {
    setPopUpVisible(true);
  };

  const closeModal = () => {
    setPopUpVisible(false);
  };

  {/* 帰宅時のステータス変更 */}
  const updatejuststatus = async (statusDescription) => {
    if (user) {
      try {
        const statusId = getStatusId(statusDescription);
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
        if (result.update) {
          console.log(`Status updated to ${statusDescription}`);
          setUserStatus(statusDescription);
        } else {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  {/* ステータスの変更 */}
  const updateStatus = async (statusDescription) => {
    if (user) {
      try {
        if (statusDescription === "帰宅") {
          openModal(); // 研究室の場合はポップアップを表示
        } else {
          const statusId = getStatusId(statusDescription);
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
          if (result.update) {
            console.log(`Status updated to ${statusDescription}`);
            setUserStatus(statusDescription);
          } else {
            console.error('Failed to update status');
          }
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

    {/* 備考欄の変更 */}
    const updateremarks = async (remarksDescription) => {
      if (user) {
        try {
          const response = await fetch(`https://www.pronavi.online/railsapp/api/v1/users/schedules/details`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              schedule: {
                user_id: user.uid,
                status_details:{
                  description: remarksDescription
                },
              },
            }),
          });
          const result = await response.json();
          if (result.update) {
            console.log(`Status updated to ${remarksDescription}`);
            setUserStatus(remarksDescription);
          } else {
            console.error('Failed to update remarks');
          }
        } catch (error) {
          console.error('Error updating remarks:', error);
        }
      }
    };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const getStatusDescription = (statusId) => {
    const status = statusLegend.find(s => s.number === statusId);
    return status ? status.description : 'Unknown';
  };

  const getStatusId = (statusDescription) => {
    const status = statusLegend.find(s => s.description === statusDescription);
    return status ? status.number : -1;
  };

  useEffect(() => {
    if (user) {
      console.log('Logged in user:', user);
      if (user.uid) {
        navigator.geolocation.getCurrentPosition(
          position => {
            console.log('Current coordinates:', position.coords.latitude, position.coords.longitude);
            const universityBoolean =
              position.coords.latitude >= UNIVERSITY_LATITUDE_RANGE[0] &&
              position.coords.latitude <= UNIVERSITY_LATITUDE_RANGE[1] &&
              position.coords.longitude >= UNIVERSITY_LONGITUDE_RANGE[0] &&
              position.coords.longitude <= UNIVERSITY_LONGITUDE_RANGE[1]
                ? 1
                : 0;
            updateLocationStatus(universityBoolean);
          },
          error => {
            console.error('Error getting location:', error);
          }
        );
      }
      fetchUserData(user.uid);
    }
  }, [user]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch('https://www.pronavi.online/railsapp/api/v1/users/index');
      const data = await response.json();
      const currentUser = data.find(u => u.User_id === userId);
      if (currentUser) {
        setUserName(currentUser.User_name);
        setUserStatus(getStatusDescription(currentUser.Status_id));
      } else {
        setUserName('none');
        setUserStatus('none');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserName('none');
      setUserStatus('none');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateLocationStatus = async (universityBoolean) => {
    if (user) {
      try {
        const response = await fetch(`https://www.pronavi.online/railsapp/api/v1/users/locations`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.uid,
            location: {
              university_boolean: universityBoolean.toString(),
            },
          }),
        });
        const result = await response.json();
        if (result.status !== 'success') {
          console.error('Failed to update location status');
        }
      } catch (error) {
        console.error('Error updating location status:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (user.uid) {
        fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
            console.log('IP Address:', data.ip);
            checkVpnStatusAndLocation(data.ip);
          })
          .catch(error => {
            console.error('Error fetching IP address:', error);
          });
      }
    }
  }, [user, location]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log('Location:', { latitude, longitude });
      },
      error => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  const checkVpnStatusAndLocation = (ip) => {
    fetch(`https://ipinfo.io/${ip}/json?token=${ipInfoApiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.hostname && data.hostname.includes('vpn')) {
          console.log('VPN Status: Connected');
          checkLocationAndUpdateStatus();
        } else {
          console.log('VPN Status: Not Connected');
          if (ip.startsWith('133.14')) {
            console.log("大学内");
            isIn(1);
          } else {
            checkLocationAndUpdateStatus();
          }
        }
      })
      .catch(error => {
        console.error('Error fetching VPN status:', error);
      });
  };

  const checkLocationAndUpdateStatus = () => {
    if (location) {
      const { latitude, longitude } = location;
      if (
        latitude >= UNIVERSITY_LATITUDE_RANGE[0] &&
        latitude <= UNIVERSITY_LATITUDE_RANGE[1] &&
        longitude >= UNIVERSITY_LONGITUDE_RANGE[0] &&
        longitude <= UNIVERSITY_LONGITUDE_RANGE[1]
      ) {
        console.log("大学内");
        isIn(1);
      } else {
        console.log("大学外");
        isIn(0);
      }
    }
  };

  const isIn = async (universityBoolean) => {
    if (user) {
      try {
        const response = await fetch('https://www.pronavi.online/railsapp/api/v1/users/locations', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.uid,
            location: {
              university_boolean: universityBoolean,
            },
          }),
        });
        const data = await response.json();
        if (data.status === 'success') {
          console.log('Status updated successfully');
        } else {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Status Page</h1>
        <div>Loading...</div>
      </div>
    );
  }

  const buttonStyle = size.width <= 425 ? { width: '80px', height: '70px' } : { width: '120px', height: '100px' };
  const textsize = size.width <= 425 ? '38px' : '70px';

  const windowsize = (windowSize) => {
    return statusLegend.map((status, index) => (
      <Button
        key={index}
        onClick={() => updateStatus(status.description)}
        bg={status.color}
        color="black"
        m="5px"
        _hover={{ color: 'green.500' }}
        className="status-button"
        border="2px solid black"
        {...buttonStyle}
      >
        <Text fontSize="18">{status.description}</Text>
      </Button>
    ));
  };

  return (
    <div>
      <StHeader />

      <Box
        position="fixed"
        top={size.height * 0.3}
        left="50%"
        transform="translate(-50%, -50%)"
        bg="gray.10"
        p={1}
        zIndex="100"
        textAlign="center"
      >
        <Text fontSize={textsize}>{userStatus !== '' && userStatus}</Text>
      </Box>

      <Box
        position="fixed"
        top={size.height * 0.45}
        left="50%"
        transform="translate(-70%, -40%)"
        bg="white"
        p={1}
        zIndex="100"
        textAlign="center"
      >
        <Input
          bg="white"
          type="text"
          placeholder="備考"
          value={statusText}
          onChange={(e) => setStatusText(e.target.value) && updateremarks(e.target.value)}
        />
        <Button
          position="fixed"
          border="0.5px solid gray"
          transform={size.width}
          bg="white"
          p={1}
          zIndex="100"
          width="50%"
          onClick={() =>setStatusText('')}
        >
          <Text>リセット</Text>
        </Button>
      </Box>

      <Box
        position="fixed"
        top={size.height * 0.5}
        transform={size.width}
        bg="gray.10"
        p={1}
        zIndex="100"
        width="100%"
      >
        <Flex
          justify="center"
          align="center"
          wrap="wrap"
          className="status-container"
        >
          {windowsize(size)}
        </Flex>
      </Box>

      <Modal isOpen={isPopUpVisible} onClose={closeModal} zIndex="1000">
        <Box p={4} textAlign="center">
          <Text color="red" fontWeight="bold">WARNING!!</Text>
          <p>ステータスを変更しますか？</p>
          <p>変更すると翌日の0時まで変更することができません</p>
          <Flex justify="center" mt={4}>
            <Button onClick={closeModal} mr={35}>NO</Button>
            <Button onClick={() => { updatejuststatus('帰宅'); closeModal(); }} ml={2}>YES</Button>
          </Flex>
        </Box>
      </Modal>
    </div>
  );
};

export default Status;
