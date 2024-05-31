import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Box className="App">
          <Header />
          <Box mt="60px"> {/* Adjust for fixed header */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/status" element={<Status />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/completion" element={<Completion />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
