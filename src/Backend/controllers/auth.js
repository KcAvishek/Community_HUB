const User = require('../models/User');
const Community = require('../models/Community');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utiles/mail'); 

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

    // Send email to the user asynchronously
    sendEmail({
      to: email,
      subject: `Join the Community HUB Adventure, ${username}!`,
      text: `Your Community HUB account is ready! You're a Non-Member—log in to discover communities, connect, and grow.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Welcome, ${username}!</h1>
          <p style="color: #555;">Congratulations! Your <strong>Community HUB</strong> account is ready. As a <strong>Non-Member</strong>, you're just one step away from connecting with different communities.</p>
        </div>
      `,
    }).catch((error) => {
      console.error('Error sending email (register):', error);
    });

    res.status(200).json({ message: 'User registered successfully', newUser });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Error during registration', error: err.message });
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

    // Send email to the user asynchronously
    sendEmail({
      to: user.email,
      subject: `Successfully Login ${username}`,
      text: 'You have been successfully logged in.',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Welcome, ${username}!</h1>
          <p style="color: #555;">You have been successfully logged in.</p></p>
        </div>
      `,
    }).catch((error) => {
      console.error('Error sending email (login):', error);
    });

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

// Update user details (username, email, role, community, and password)
const updateUserRoleAndCommunity = async (req, res) => {
  try {
    const { userId, username, email, role, community_name, password } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Prepare the update object with fields that are provided
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (role) updateFields.role = role;
    if (community_name !== undefined) updateFields.community_name = community_name;
    if (password) {
      updateFields.password = password; // Plain text for now to match existing setup
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User details updated successfully',
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

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('username email role community_name _id password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

module.exports = { register, login, updateUserRoleAndCommunity, getCommunityMembers, getAllUsers };