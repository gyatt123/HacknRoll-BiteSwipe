import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './pages/FirstPage';
import PartyLeaderPage from './pages/PartyLeaderPage';
import TinderPage from './pages/TinderPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/party-leader" element={<PartyLeaderPage />} />
        <Route path="/tinder" element={<TinderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
