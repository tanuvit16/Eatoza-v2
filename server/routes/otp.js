const express            = require('express');
const router             = express.Router();
const { sendOTP, verifyOTP } = require('../utils/otpService');

// ── POST /api/otp/send ──
// Sends OTP to admin email
router.post('/send', async (req, res) => {
  try {
    const { action } = req.body;
    const token = await sendOTP(action || 'perform this action');
    res.json({ success: true, token, message: 'OTP sent to your email!' });
  } catch (err) {
    console.error('OTP send error:', err);
    res.status(500).json({ success: false, message: 'Failed to send OTP. Check email config.' });
  }
});

// ── POST /api/otp/verify ──
// Verifies OTP before allowing action
router.post('/verify', (req, res) => {
  try {
    const { token, otp } = req.body;
    if (!token || !otp) {
      return res.status(400).json({ success: false, message: 'Token and OTP are required.' });
    }
    const result = verifyOTP(token, otp);
    if (result.valid) {
      res.json({ success: true, message: 'OTP verified successfully!' });
    } else {
      res.status(400).json({ success: false, message: result.message });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Verification failed.' });
  }
});

module.exports = router;