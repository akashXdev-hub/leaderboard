import React from 'react';

function TopThree({ leaderboard }) {
  return (
    <div className="top-three">
      {leaderboard.slice(0, 3).map((user, index) => {
        const medalClass = index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze';
        return (
          <div key={user._id} className={`top-user rank-${index + 1} ${medalClass}`}>
            <div className="rank-label">#{index + 1}</div>
            <img src={user.avatarUrl || 'https://via.placeholder.com/80'} alt={user.name} />
            <p>{user.name}</p>
            <span>{user.totalPoints} pts</span>
          </div>
        );
      })}
    </div>
  );
}

export default TopThree;
