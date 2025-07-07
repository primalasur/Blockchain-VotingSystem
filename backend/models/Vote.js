const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: {
    type: String, // Use the wallet address as the user ID
    required: true,
  },
  candidateId: {
    type: String, // This could be a number or string depending on how you store candidate IDs
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
