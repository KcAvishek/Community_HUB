const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  community_name: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: [{
    name: { type: String, required: true },
    status: { type: String, enum: ['Not Marked', 'Absent', 'Present', 'Late'], default: 'Not Marked' },
    updatedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;
