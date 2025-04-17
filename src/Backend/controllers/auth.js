const User = require('../models/User');
const Community = require('../models/Community');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

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

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully', newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error during registration', error: err });
  }
};

// Login user
const login = async (req, res) => {
  const { username, password, role, community_name } = req.body;
  console.log('Received login data:', req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (role === 'leader') {
      if (!community_name) {
        return res.status(400).json({ message: 'Community name is required for leaders' });
      }

      const community = await Community.findOne({ name: community_name });
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }

      if (community.leader_id !== user._id.toString()) {
        return res.status(403).json({ message: 'User is not authorized for this community' });
      }
    }

    if (role === 'communityMember') {
      if (!community_name) {
        return res.status(400).json({ message: 'Community name is required for community members' });
      }

      const community = await Community.findOne({ name: community_name });
      if (!community) {
        return res.status(404).json({ message: 'Community not found' });
      }
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successfully',
      community: community_name,
      role: user.role,
      user_id: user._id,
      email: user.email,
      username: user.username,
      token,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update user role and community
const updateUserRoleAndCommunity = async (req, res) => {
  try {
    const { userId, role, community_name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role, community_name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User role and community updated',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message,
    });
  }
};

// Get members of a community
const getCommunityMembers = async (req, res) => {
  try {
    const { community_name } = req.params;
    const users = await User.find({ community_name }).select('username email _id role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch members', error: error.message });
  }
};

module.exports = {register,login,updateUserRoleAndCommunity,getCommunityMembers,};
