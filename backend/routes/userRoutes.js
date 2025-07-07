const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Validate user based on QR Code data (userId and ethAddress)
router.post('/validate', async (req, res) => {
  const { userId, ethAddress } = req.body;
  
  try {
    const user = await User.findOne({ userId, ethAddress });
    if (user && !user.hasVoted) {
      return res.status(200).json({ message: 'User is valid' });
    }
    res.status(400).json({ message: 'User not found or already voted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
