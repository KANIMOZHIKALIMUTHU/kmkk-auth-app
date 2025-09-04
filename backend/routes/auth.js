import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";

const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.run(query, [email, hashedPassword], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        return res.status(400).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Error registering user" });
    }
    res.json({ message: "User registered successfully" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = { id: user.id, email: user.email };
    res.json({ message: "Login successful", user: req.session.user });
  });
});

// Check session
router.get("/me", (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  res.status(401).json({ message: "Not logged in" });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.json({ message: "Logged out" });
});

export default router;
