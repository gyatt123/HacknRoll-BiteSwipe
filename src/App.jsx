import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import PartyLeaderPage from './pages/PartyLeaderPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/party-leader" element={<PartyLeaderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
