const nodemailer = require('nodemailer');

// Store OTPs in memory { token: { otp, expiresAt } }
const otpStore = {};

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTP = async (action = 'perform this action') => {
  const otp     = generateOTP();
  const token   = Date.now().toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

  // Store OTP
  otpStore[token] = { otp, expiresAt: expires };

  // Clean up expired OTPs
  Object.keys(otpStore).forEach(key => {
    if (otpStore[key].expiresAt < Date.now()) delete otpStore[key];
  });

  // Send email
  await transporter.sendMail({
    from:    `"Eatoza Security" <${process.env.GMAIL_USER}>`,
    to:      process.env.ADMIN_EMAIL,
    subject: '🔐 Eatoza OTP Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <div style="background: #ef4f5f; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Eatoza</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Security Verification</p>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #eee; border-radius: 0 0 12px 12px;">
          <p style="color: #333; font-size: 16px;">Someone is trying to <strong>${action}</strong> on Eatoza.</p>
          <p style="color: #333;">Your OTP is:</p>
          <div style="background: #f8f8f8; border: 2px dashed #ef4f5f; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 40px; font-weight: bold; letter-spacing: 10px; color: #ef4f5f;">${otp}</span>
          </div>
          <p style="color: #888; font-size: 13px;">⏱ This OTP expires in <strong>5 minutes</strong>.</p>
          <p style="color: #888; font-size: 13px;">🔒 If you didn't request this, ignore this email.</p>
        </div>
      </div>
    `,
  });

  return token;
};

// Verify OTP
const verifyOTP = (token, otp) => {
  const record = otpStore[token];
  if (!record)                          return { valid: false, message: 'OTP expired or invalid. Please request a new one.' };
  if (record.expiresAt < Date.now())    return { valid: false, message: 'OTP has expired. Please request a new one.' };
  if (record.otp !== otp.toString())    return { valid: false, message: 'Incorrect OTP. Please try again.' };

  // Delete after successful verification
  delete otpStore[token];
  return { valid: true };
};

module.exports = { sendOTP, verifyOTP };