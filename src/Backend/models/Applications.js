const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  community_name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  status: { type: String,enum: ['pending', 'accepted', 'rejected'],default: 'pending'},
  user_id: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true}
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
