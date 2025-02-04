const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch leaderboard data
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ gamesWon: -1 }).limit(10);
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;