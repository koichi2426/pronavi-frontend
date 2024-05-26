import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Status from './pages/status';
import Registration from './pages/Registration';

function App() {
  return (
    <>
      <div>app</div>
      <Router>
        <Routes>
          <Route path="/status" element={<Status />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
