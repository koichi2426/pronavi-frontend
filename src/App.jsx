import React, { useState } from 'react';
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
  const [selectedFilter, setSelectedFilter] = useState('1'); // フィルタリングオプションの初期値を設定

  return (
    <AuthProvider>
      <Router>
        <Main selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      </Router>
    </AuthProvider>
  );
}

function Main({ selectedFilter, setSelectedFilter }) {
  const location = useLocation();

  return (
    <Box className="App">
      {location.pathname === '/' && <Header onFilterChange={setSelectedFilter} />}
      <Box mt={location.pathname === '/' ? "60px" : "0px"}> 
        <Routes>
          <Route path="/" element={<Home selectedFilter={selectedFilter} />} />
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
