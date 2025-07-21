import React from 'react';

function LeaderboardList({ leaderboard }) {
  return (
    <div className="others">
      {leaderboard.map((user, index) => (
        <div key={user._id} className="user-row">
          <span className="rank">#{index + 4}</span>
          <img src={user.avatarUrl || 'https://via.placeholder.com/40'} alt={user.name} />
          <span>{user.name}</span>
          <span>{user.totalPoints} pts</span>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardList;
