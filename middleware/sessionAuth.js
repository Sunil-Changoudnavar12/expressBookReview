function sessionAuth(req, res, next) {
  if (req.session && req.session.user) {
    req.user = { username: req.session.user };
    return next();
  }

  return res.status(401).json({ error: "Session expired or user not logged in." });
}

module.exports = sessionAuth;
