const express = require("express");
const users = require("../users");
const { generateToken } = require("../middleware/jwt");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ error: "Username already exists." });
  }

  users.push({ username, password });

  return res.status(201).json({
    message: "User registered successfully.",
    user: { username },
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const user = users.find(
    (existingUser) =>
      existingUser.username === username && existingUser.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = generateToken(username);

  req.session.user = username;
  req.session.token = token;

  return res.status(200).json({
    message: "Login successful.",
    user: { username },
    token,
  });
});

module.exports = router;
