const Application = require('../models/Applications');
const User = require('../models/User');

// Submit application
const createApplication = async (req, res) => {
  try {
    const { community_name, username, email, feedback, user_id } = req.body;

    console.log('Incoming Application Data:', { community_name, username, email, feedback, user_id });

    const newApp = new Application({ community_name, username, email, feedback, user_id });

    await newApp.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application: newApp
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message || 'Unknown error'
    });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('user_id', 'username email');
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message || 'Unknown error'
    });
  }
};

// ✅ Update application status + user role & community
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find application by ID
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Update application status
    application.status = status;
    await application.save();

    // ✅ Update user only when accepted
    if (status === 'accepted') {
      const updatedUser = await User.findByIdAndUpdate(
        application.user_id,
        {
          role: 'communityMember',
          community_name: application.community_name,
        },
        { new: true } // Ensure the returned document is updated
      );

      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found for update' });
      }
    }

    // Send back updated application
    res.status(200).json({
      success: true,
      message: 'Application status updated',
      updated: application,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message || 'Unknown error',
    });
  }
};

module.exports = { createApplication, getAllApplications, updateApplicationStatus };
