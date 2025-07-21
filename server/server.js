const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Serve static files for uploaded avatars
app.use('/api/users/avatars', express.static(path.join(__dirname, 'uploads')));

// Allow frontend origin (React)
app.use(cors({ origin: 'http://localhost:3000' }));

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("connection error", err));

// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
