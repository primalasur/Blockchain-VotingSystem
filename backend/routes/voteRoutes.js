const express = require('express');
const Vote = require('../models/Vote');
const router = express.Router();

// Route to record a vote
router.post('/', async (req, res) => {
  const { userId, candidateId } = req.body;

  try {
    // Record the vote in MongoDB
    const vote = new Vote({
      userId,
      candidateId,
    });

    await vote.save();

    res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error recording vote' });
  }
});

module.exports = router;
