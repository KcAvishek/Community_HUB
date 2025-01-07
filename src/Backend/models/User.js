const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'sub-admin', 'member', 'non-member'], required: true },
  community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', default: null },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: Boolean, default: true },
  joined_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
