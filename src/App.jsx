import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Status from './pages/status';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/status" element={<Status />} />
      </Routes>
    </Router>
  );
}

export default App;
