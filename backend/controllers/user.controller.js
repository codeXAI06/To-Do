import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
console.log(req.body);
  const { username, password } = req.body;
  if(!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }
  const existingUser = await User.findOne({ username });
  if(existingUser) {
    return res.status(409).json({ message: "User already exists, please login" });
  }
  const newUser = new User({ username, password });
  try {
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log("Error in creating user: " + error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    return res.status(400).json({ message: "Please provide username and password" });
  }
  const user = await User.findOne({ username });
  if(!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isMatch = await user.comparePassword(password);
  if(!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.status(200).json({ success: true, token });
};
