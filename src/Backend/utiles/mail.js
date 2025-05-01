require('dotenv').config({ path: './config.env' });
const nodemailer = require('nodemailer');

// Log environment variables for debugging
console.log('MAILTRAP_HOST:', process.env.MAILTRAP_HOST);
console.log('MAILTRAP_PORT:', process.env.MAILTRAP_PORT);
console.log('MAILTRAP_USERNAME:', process.env.MAILTRAP_USERNAME);
console.log('MAILTRAP_PASSWORD:', process.env.MAILTRAP_PASSWORD);

// Create a transporter using Mailtrap SMTP
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
  port: process.env.MAILTRAP_PORT || 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// Function to send email
const sendEmail = async ({ to, subject, text, html }) => {
  // Basic validation
  if (!to || !subject || !text) {
    throw new Error('Missing required fields: to, subject, and text are required');
  }

  try {
    const mailOptions = {
      from: '"Community Hub" <no-reply@communityhub.com>', // Updated sender
      to, // Recipient email
      subject, // Email subject
      text, // Plain text body
      html, // HTML body (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };