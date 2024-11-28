const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Login = require('../models/LoginSchema'); // Path to your Login model

// Register User
exports.register = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;
  
  try {
    const existingUser = await Login.findOne({ f_userName });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(f_Pwd, 10);
    const newUser = new Login({ f_userName, f_Pwd: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  try {
      const user = await Login.findOne({ f_userName });
      console.log(user,"hepllkjjhdff")
    if (!user) return res.status(400).json({ message: 'Invalid login details' });

      const isPasswordValid = await bcrypt.compare(f_Pwd, user.f_Pwd);
      console.log(isPasswordValid)
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid login details' });
   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
      
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Protected Route (Dashboard)
exports.dashboard = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Login.findById(verified.id).select('-f_Pwd');
    res.status(200).json({ message: 'Welcome to the Dashboard', user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
