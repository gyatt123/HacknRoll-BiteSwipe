import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';  // or import './index.css';

const PartyLeaderPage = () => {
  const location = useLocation();
    const { partyCode } = location.state;
    const navigate = useNavigate();
        
    const handleStartParty = () => {
        navigate('/tinder', { state: { partyId: location.state.partyId } });
    }

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <h1 className="header">Welcome Party Leader! 💖</h1>
                <p className="party-info">
                    <strong>Party Code:</strong> {partyCode}
                </p>
                <p className="instructions">Share this code with your friends to join the party!</p>
                <button onClick={handleStartParty} className="action-button">Start the Party</button>
            </div>
        </div>
    );
};

export default PartyLeaderPage;
