const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    votes: [{ type: Number, default: 0 }],
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    expires_at: { type: Date }
  });
  
  const Poll = mongoose.model('Poll', pollSchema);
  