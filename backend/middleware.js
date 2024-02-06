const JWT_SECRET = require("/config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken || bearerToken.startsWith("Bearer ")) {
    res.status(403).json({});
  }
  const token = bearerToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(403).json({});
    }
  } catch (err) {
    res.status(403).json({});
  }
};

module.exports = authMiddleware;
