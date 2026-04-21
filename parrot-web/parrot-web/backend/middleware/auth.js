const jwt = require('jsonwebtoken');

const verify = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
    return null;
  }
};

const auth = (req, res, next) => {
  const decoded = verify(req, res);
  if (!decoded) return;
  req.user = decoded;
  next();
};

auth.adminOnly = (req, res, next) => {
  const decoded = verify(req, res);
  if (!decoded) return;
  if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  req.user = decoded;
  next();
};

auth.restaurantOnly = (req, res, next) => {
  const decoded = verify(req, res);
  if (!decoded) return;
  if (decoded.role !== 'restaurant') return res.status(403).json({ message: 'Restaurant access required' });
  if (!decoded.restaurantId) return res.status(403).json({ message: 'No restaurant linked' });
  req.user = decoded;
  next();
};

auth.deliveryOnly = (req, res, next) => {
  const decoded = verify(req, res);
  if (!decoded) return;
  if (decoded.role !== 'delivery') return res.status(403).json({ message: 'Delivery access required' });
  req.user = decoded;
  next();
};

auth.userOnly = (req, res, next) => {
  const decoded = verify(req, res);
  if (!decoded) return;
  if (decoded.role !== 'user') return res.status(403).json({ message: 'User access required' });
  req.user = decoded;
  next();
};

module.exports = auth;
