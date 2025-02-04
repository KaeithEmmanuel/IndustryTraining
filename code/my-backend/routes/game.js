const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const auth = require('../middleware/auth');

// Create a new game
router.post('/create', auth, async (req, res) => {
    const game = new Game({ players: [req.userId] });
    await game.save();
    res.status(201).json(game);
});

// End a game
router.post('/end', auth, async (req, res) => {
    const { gameId, winnerId } = req.body;
    const game = await Game.findById(gameId);
    game.winner = winnerId;
    game.endTime = Date.now();
    await game.save();
    res.status(200).json(game);
});

module.exports = router;