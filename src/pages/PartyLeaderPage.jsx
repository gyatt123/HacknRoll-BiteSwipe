import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';  // or import './index.css'; 

const PartyLeaderPage = () => {
  const location = useLocation();
  const { partyCode } = location.state;

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="header">Welcome Party Leader! 💖</h1>
        <p className="party-info">
          <strong>Party Code:</strong> {partyCode}
        </p>
        <p className="instructions">Share this code with your friends to join the party!</p>
        <button className="action-button">Start the Party</button>
      </div>
    </div>
  );
};

export default PartyLeaderPage;
