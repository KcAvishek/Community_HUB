const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','leader', 'communityMember', 'non-member'], required: true },
  community_name: { type: String, default: "" },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: Boolean, default: true },
  joined_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', userSchema);