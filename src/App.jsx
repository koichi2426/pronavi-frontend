import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Status from './pages/status';
import Registration from './pages/registration';
import Home from './pages/home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
