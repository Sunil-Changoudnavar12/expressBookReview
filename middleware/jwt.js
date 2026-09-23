const jwt = require("jsonwebtoken");

const JWT_SECRET = "online-book-review-secret";

function generateToken(username) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
}

function verifyToken(token) {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
