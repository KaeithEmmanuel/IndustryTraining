const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    winner: { type: Schema.Types.ObjectId, ref: 'User' },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
});

module.exports = mongoose.model('Game', gameSchema);