const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }


    // Create a new user with the default role
    const newUser = await User.create({
      username,
      email,
      password,
      role: 'non-member', // Set default role
    });

// Save the user to the database
    await newUser.save();
    
    res.status(200).json({ message: 'User registered successfully', newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error during registration', error: err });
  }
};



const login = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    console.log("Login request received:", { username, password, role });

    // Check if user exists by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("User found:", user);

    // Validate password (compare entered password with stored plain password)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log("Password validated successfully");

    // Check if the user role matches the selected role
    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    console.log (process.env.JWT_SECRET)
    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };