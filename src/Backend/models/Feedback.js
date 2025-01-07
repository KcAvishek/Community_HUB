const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community' },
    content: { type: String, required: true },
    submitted_at: { type: Date, default: Date.now },
    reviewed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewed_at: { type: Date }
  });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);
  