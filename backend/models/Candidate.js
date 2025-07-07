const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Candidate ID
  name: { type: String, required: true }, // Candidate's name
  party: { type: String }, // Party affiliation
  description: { type: String }, // Description of the candidate
  votes: { type: Number, default: 0 } // Votes count
});

module.exports = mongoose.model('Candidate', candidateSchema);
