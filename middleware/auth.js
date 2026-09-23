const users = require("../users");
const { verifyToken } = require("./jwt");

function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    const sessionUser = users.find((user) => user.username === req.session.user);

    if (!sessionUser) {
      return res.status(401).json({ error: "Session user not found." });
    }

    req.user = sessionUser;
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. Please login first." });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded || !decoded.username) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }

  const loggedInUser = users.find((user) => user.username === decoded.username);

  if (!loggedInUser) {
    return res.status(401).json({ error: "User not found." });
  }

  req.user = loggedInUser;
  return next();
}

module.exports = authMiddleware;
