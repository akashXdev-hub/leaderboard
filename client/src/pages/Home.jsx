import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewUserForm from '../components/NewUserForm';
import ClaimPoints from '../components/ClaimPoints';
import './Home.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [pointsAwarded, setPointsAwarded] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('https://leaderboard-9e3h.onrender.com/api/users');
    setUsers(res.data);
  };

  const fetchLeaderboard = async () => {
    const res = await axios.get('https://leaderboard-9e3h.onrender.com/api/users/leaderboard');
    setLeaderboard(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  return (
    <div className="home-container">
      <h1>🏆 Add User & Claim Points</h1>
      <NewUserForm onUpload={fetchUsers} refreshLeaderboard={fetchLeaderboard} />
      <ClaimPoints
        users={users}
        onClaim={fetchUsers}
        refreshLeaderboard={fetchLeaderboard}
        pointsAwarded={pointsAwarded}
        setPointsAwarded={setPointsAwarded}
      />
    </div>
  );
}

export default Home;
