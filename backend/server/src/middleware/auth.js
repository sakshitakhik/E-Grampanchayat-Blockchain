const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  return (req, res, next) => {
    // 1. Check for token
    const token = req.header('Authorization')?.split(' ')[1];

    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
      } catch (err) {
        // Fall through to other methods
      }
    }

    // 2. Check for userId in body or query (for testing without tokens)
    const userId = (req.body && req.body.userId) || req.query.userId;
    const role = (req.body && req.body.role) || req.query.role || 'Citizen';

    if (userId) {
      req.user = { id: userId, role: role };
      return next();
    }

    // 3. Unauthorized access
    return res.status(401).json({ message: 'Unauthorized: No token or user ID provided' });
  };
};

module.exports = auth;
