const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/upload', upload.single('avatar'), async (req, res) => {
  const { name } = req.body;
  const avatarUrl = `http://localhost:5000/api/users/avatars/${req.file.filename}`;
  const user = new User({ name, avatarUrl });
  await user.save();
  res.json(user);
});

router.post('/claim/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const points = Math.floor(Math.random() * 10) + 1;
  user.totalPoints += points;
  await user.save();
  const history = new History({ userId: user._id, points });
  await history.save();
  res.json({ user, points });
});

router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
});

router.get('/history', async (req, res) => {
  const history = await History.find().populate('userId').sort({ claimedAt: -1 });
  res.json(history);
});

module.exports = router;
