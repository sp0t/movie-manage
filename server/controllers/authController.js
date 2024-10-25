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

exports.verifyToken = async (req, res) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ valid: false, message: 'User not found' });
    }

    res.json({ valid: true, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Token is invalid or expired' });
  }
}