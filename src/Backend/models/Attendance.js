const mongoose = require('mongoose');

// Attendance Schema
const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  attendees: [{
    attendeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    status: { type: String, enum: ['Not Marked', 'Absent', 'Present', 'Late'], default: 'Not Marked' },
    updatedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);