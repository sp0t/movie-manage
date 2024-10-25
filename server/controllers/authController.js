const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      email,
      password,
    });

    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ token: token, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({token: token, message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'User logged out successfully' });
};
