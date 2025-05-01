const Application = require('../models/Applications');
const User = require('../models/User');
const { sendEmail } = require('../utiles/mail'); // Import sendEmail

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

// Update application status + user role & community
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
    application.save().catch((error) => {
      console.error('Error saving application status:', error);
    });

    // Update user only when accepted
    if (status === 'accepted') {
      User.findByIdAndUpdate(
        application.user_id,
        {
          role: 'communityMember',
          community_name: application.community_name,
        },
        { new: true }
      ).catch((error) => {
        console.error('Error updating user:', error);
      });
    }

    // Send email to the user asynchronously
    const emailSubject = `Application ${status === 'accepted' ? 'Accepted' : 'Rejected'} for ${application.community_name}`;
    const emailText = `Your application to join ${application.community_name} has been ${status}.`;
    const emailHtml = `
      <h1>Application Status Update</h1>
      <p>Your application to join <strong>${application.community_name}</strong> has been <strong>${status}</strong>.</p>
      ${status === 'accepted' ? '<p>Welcome to the community! You are now a <strong>Community Member</strong>.</p>' : '<p>Thank you for applying. Please contact the community leader for more details.</p>'}
    `;

    sendEmail({
      to: application.email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    }).catch((error) => {
      console.error('Error sending application status email:', error);
    });

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