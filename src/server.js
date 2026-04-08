const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import models
const User = require("../models/User");
const Key = require("../models/Key");

const app = express();

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// middleware
app.use(cors());
app.use(express.json());

// ================= AUTH ROUTES =================

// REGISTER
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, "secret123");

    res.json({ token });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// ================= FRONTEND =================
app.use(express.static("public"));

// ================= KEY ROUTE =================
app.get("/get-key", async (req, res) => {
  try {
    const key = Math.random().toString(36).substring(2, 10).toUpperCase();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const newKey = new Key({
      key,
      expiresAt
    });

    await newKey.save();

    res.json({ key, expiresAt });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});