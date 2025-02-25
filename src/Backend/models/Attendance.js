const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  meeting_date: { type: Date, default: Date.now }, // Date of the meeting
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of attendees
});

module.exports = mongoose.model('Attendance', attendanceSchema);
