const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    expires_at: { type: Date }
  },{ timestamps: true });
  
  const Announcement = mongoose.model('Announcement', announcementSchema);
  module.exports = Announcement;