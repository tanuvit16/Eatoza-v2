const { createClerkClient } = require('@clerk/backend');

const clerkClient = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY 
});

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided. Please log in.' 
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token with Clerk
    const payload = await clerkClient.verifyToken(token);
    
    // Attach user info to request
    req.userId = payload.sub;
    next();

  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token. Please log in again.' 
    });
  }
};

module.exports = requireAuth;