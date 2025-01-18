import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const CreateParty = () => {
  const [location, setLocation] = useState('');
  const [partyCode, setPartyCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateParty = async () => {
    setLoading(true);
    try {
      // Insert a new party into the "parties" table
      const { data, error } = await supabase
        .from('parties')
        .insert([{ location }])
        .select();

      if (error) {
        throw error;
      }

      // Get the generated party code
      const newParty = data[0];
      setPartyCode(newParty.code);
      alert(`Party created! Your party code is: ${newParty.code}`);
    } catch (error) {
      console.error('Error creating party:', error.message);
      alert('Failed to create party. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a Party</h1>
      <input
        type="text"
        placeholder="Enter location (e.g., 5 miles radius)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleCreateParty} disabled={loading}>
        {loading ? 'Creating...' : 'Create Party'}
      </button>
      {partyCode && <p>Your Party Code: <strong>{partyCode}</strong></p>}
    </div>
  );
};

export default CreateParty;
