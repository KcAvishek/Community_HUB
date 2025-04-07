const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_by: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    expires_at: { type: Date }
  });
  
  const Announcement = mongoose.model('Announcement', announcementSchema);
  module.exports = Announcement;