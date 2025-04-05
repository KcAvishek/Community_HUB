const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  question:    { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  content:     { type: String, required: true },
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date },
  parentReply: { type: mongoose.Schema.Types.ObjectId, ref: 'Reply', default: null } // For nested replies (optional)
});

module.exports = mongoose.model('Reply', replySchema);
