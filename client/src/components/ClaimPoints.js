import React, { useState } from 'react';
import axios from 'axios';

function ClaimPoints({ users, onClaim, refreshLeaderboard, pointsAwarded, setPointsAwarded }) {
  const [selectedUser, setSelectedUser] = useState('');

  const claim = async () => {
    if (!selectedUser) return alert("Please select a user");
    const res = await axios.post(`http://localhost:5000/api/users/claim/${selectedUser}`);
    setPointsAwarded(res.data.points);
    onClaim();
    refreshLeaderboard();
  };

  return (
    <div className="claim-section">
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
      <button onClick={claim}>Claim Points</button>
      {pointsAwarded && <p className="points-msg">{pointsAwarded} points awarded!</p>}
    </div>
  );
}

export default ClaimPoints;
