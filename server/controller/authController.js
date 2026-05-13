const { emailRegex, passwordRegex } = require("../services/allRegex");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h"
  });
};

// ------------register controller--------------
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({ name, email, password });
  const token = createToken(user);
  res.status(201).json({
    message: "Registered",
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      token
    }
  });
};

// ------------login controller--------------
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = createToken(user);
  res.json({
    message: "Logged in",
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      token
    }
  });
};

// ---------profile-----
const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "Profile", data: user });
};

module.exports = { register, login, profile };