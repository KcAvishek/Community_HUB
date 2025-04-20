const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;