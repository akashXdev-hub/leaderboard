import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopThree from '../components/TopThree';
import LeaderboardList from '../components/LeaderboardList';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    const res = await axios.get('https://leaderboard-9e3h.onrender.com/api/users/leaderboard');
    setLeaderboard(res.data);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="app-container">
      <h1>🏅 Leaderboard</h1>
      <div className="leaderboard">
        <TopThree leaderboard={leaderboard} />
        <LeaderboardList leaderboard={leaderboard.slice(3)} />
      </div>
    </div>
  );
}

export default Leaderboard;
