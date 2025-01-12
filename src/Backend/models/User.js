// 
// const mongoose = require('mongoose');
// 
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true }, 
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'sub-admin', 'member', 'non-member'], required: true },
//   community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', default: null },
//   created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   status: { type: Boolean, default: true },
//   joined_at: { type: Date, default: Date.now }
// });
// 
// module.exports = mongoose.model('User', userSchema);
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'sub-admin', 'member', 'non-member'], required: true },
  community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', default: null },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: Boolean, default: true },
  joined_at: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
