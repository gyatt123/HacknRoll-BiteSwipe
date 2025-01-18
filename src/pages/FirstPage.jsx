import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Ensure the correct path to supabase.js
import { useNavigate } from 'react-router-dom'; // Use useNavigate hook for navigation
import '../App.css';  // or import './index.css'; 


const FirstPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [partyCode, setPartyCode] = useState('');
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);

  const handleCreateParty = async () => {
    setLoadingCreate(true);
    try {
      const { data, error } = await supabase
        .from('parties')
        .insert([{ location }])
        .select();

      if (error) {
        throw error;
      }

      const newParty = data[0];
      alert(`Party created! Your party code is: ${newParty.code}`);

      navigate('/party-leader', { state: { partyCode: newParty.code, partyId: newParty.id } });

    } catch (error) {
      console.error('Error creating party:', error.message);
      alert('Failed to create party. Please try again.');
    } finally {
      setLoadingCreate(false);
    }
  };

  const handleJoinParty = async () => {
    setLoadingJoin(true);
    try {
      const { data, error } = await supabase
        .from('parties')
        .select('*')
        .eq('code', partyCode)
        .single();

      if (error) {
        throw error;
      }

      alert(`Successfully joined the party! Party ID: ${data.id}`);
      navigate('/tinder', { state: { partyId: data.id } });

    } catch (error) {
      console.error('Error joining party:', error.message);
      alert('Invalid party code. Please try again.');
    } finally {
      setLoadingJoin(false);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="header">Welcome to BiteSwipe!</h1>

        <div className="section">
          <h2>Create a Party</h2>
          <input
            type="text"
            className="input-field"
            placeholder="Enter location (e.g., 5 miles radius)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            onClick={handleCreateParty}
            disabled={loadingCreate}
            className="action-button"
          >
            {loadingCreate ? 'Creating...' : 'Create Party'}
          </button>
        </div>

        <div className="section">
          <h2>Join a Party</h2>
          <input
            type="text"
            className="input-field"
            placeholder="Enter party code"
            value={partyCode}
            onChange={(e) => setPartyCode(e.target.value)}
          />
          <button
            onClick={handleJoinParty}
            disabled={loadingJoin}
            className="action-button"
          >
            {loadingJoin ? 'Joining...' : 'Join Party'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
