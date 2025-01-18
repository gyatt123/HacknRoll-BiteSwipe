import React, { useState } from 'react';
import { supabase } from "../supabaseClient";

const JoinParty = () => {
  const [partyCode, setPartyCode] = useState('');
  const [partyDetails, setPartyDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJoinParty = async () => {
    setLoading(true);
    try {
      // Fetch the party details using the party code
      const { data, error } = await supabase
        .from('parties')
        .select('*')
        .eq('code', partyCode)
        .single();

      if (error) {
        throw error;
      }

      // Display the party details
      setPartyDetails(data);
      alert(`Successfully joined the party! Party ID: ${data.id}`);
    } catch (error) {
      console.error('Error joining party:', error.message);
      alert('Invalid party code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Join a Party</h1>
      <input
        type="text"
        placeholder="Enter party code"
        value={partyCode}
        onChange={(e) => setPartyCode(e.target.value)}
      />
      <button onClick={handleJoinParty} disabled={loading}>
        {loading ? 'Joining...' : 'Join Party'}
      </button>
      {partyDetails && (
        <div>
          <h2>Party Details</h2>
          <p><strong>Party ID:</strong> {partyDetails.id}</p>
          <p><strong>Location:</strong> {partyDetails.location}</p>
          <p><strong>Status:</strong> {partyDetails.status}</p>
        </div>
      )}
    </div>
  );
};

export default JoinParty;
