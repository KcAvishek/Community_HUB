const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  content:     { type: String, required: true },
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  community_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true }, // For community-specific discussions
  tags:        [String], // Optional tags
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date }
});

module.exports = mongoose.model('Question', questionSchema);
