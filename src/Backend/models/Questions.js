const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
