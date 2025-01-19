import React, { useState } from 'react';
import { supabase } from "../supabaseClient";

const JoinParty = () => {
  const [partyCode, setPartyCode] = useState('');
  const [partyDetails, setPartyDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJoinParty = async () => {
    setLoading(true);
    try {
      // Validate party code
      if (!partyCode || partyCode.trim().length < 6) {
        throw new Error('Please enter a valid 6-character party code');
      }

      // Fetch the party details using the party code
      const { data, error } = await supabase
        .from('parties')
        .select('*')
        .eq('code', partyCode.trim())
        .single();

      if (error) {
        throw error;
      }

      // Check if party exists
      if (!data) {
        throw new Error('Party not found. Please check the code and try again.');
      }

      // Get current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        throw new Error('User not authenticated');
      }

      console.log('Adding member:', {
        party_id: data.id,
        user_id: userData.user.id
      });

      // Add user to members table
      const { error: memberError } = await supabase
        .from('members')
        .insert({
          party_id: data.id,
          user_id: userData.user.id
        });

      if (memberError) {
        console.error('Error adding member:', memberError);
        throw memberError;
      }

      console.log('Member added successfully');

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
