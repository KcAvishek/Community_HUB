const User = require('../models/User');
const Community = require('../models/Community');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
  try {
    const { username, email, password , role} = req.body;

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
      role:"non-member", // Set default role
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
  const { username, password, role, community_name } = req.body;
  console.log("Received login data:", req.body); // Log the received data

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the provided role matches the user's role
    if (user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    // Compare the plain text password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If the role is 'leader', validate the community_name
    if (role === 'leader') {
      if (!community_name) {
        return res.status(400).json({ message: 'Community name is required for leaders' });
      }

      const community = await Community.findOne({ name: community_name });
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      // Check if the user is authorized for the community
      if (community.leader_id !== user._id.toString()) {
        return res.status(403).json({ message: 'User is not authorized for this community' });
      }
    }

    // If the role is 'Member', optionally validate the community
    if (role === 'Member' && community_name) {
      const community = await Community.findOne({ name: community_name });
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      // Check if the user belongs to the community
      const isMember = community.members.includes(user._id.toString());
      if (!isMember) {
        return res.status(403).json({ message: 'User is not a member of this community' });
      }
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return a success response
    res.status(200).json({
      message: 'Login successfully',
      community: community_name ,
      role: user.role,
      user_id: user._id,
      email: user.email,
      username: user.username,
      token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };





