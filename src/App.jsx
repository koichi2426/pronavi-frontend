import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Box } from '@yamada-ui/react';
import Login from './pages/login';
import Completion from './pages/completion';
import Status from './pages/status';
import Registration from './pages/registration';
import Home from './pages/home';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
}

function Main() {
  const location = useLocation();

  return (
    <Box className="App">
      {location.pathname === '/' && <Header />}
      <Box mt={location.pathname === '/' ? "60px" : "0px"}> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
