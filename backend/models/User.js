const mongoose = require('mongoose');

// Schema for the user
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  ethAddress: { type: String, required: true, unique: true },
  hasVoted: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
