const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate'); // Import Candidate model

// Get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find(); // Fetch all candidates
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching candidates' });
  }
});

module.exports = router;
