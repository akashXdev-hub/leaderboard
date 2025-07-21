import React, { useState } from 'react';
import axios from 'axios';

function NewUserForm({ onUpload, refreshLeaderboard }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarName, setAvatarName] = useState('');

  const handleUpload = async () => {
    if (!name || !avatar) return;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('avatar', avatar);

    await axios.post('https://leaderboard-9e3h.onrender.com/api/users/upload', formData);

    setName('');
    setAvatar(null);
    setAvatarName('');
    onUpload();
    refreshLeaderboard();
  };

  return (
    <div className="new-user-form">
      <input
        type="text"
        value={name}
        placeholder="User Name"
        onChange={(e) => setName(e.target.value)}
      />
      <label className="custom-file-upload">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setAvatar(e.target.files[0]);
            setAvatarName(e.target.files[0]?.name || '');
          }}
        />
        Choose Avatar
      </label>
      {avatarName && (
        <span style={{ marginLeft: '0.5rem', fontStyle: 'italic', color: '#555' }}>
          {avatarName}
        </span>
      )}
      <button className="upload-btn" onClick={handleUpload}>Upload User</button>
    </div>
  );
}

export default NewUserForm;
