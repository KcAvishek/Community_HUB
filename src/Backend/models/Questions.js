const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    replies: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  });
  
  const Discussion = mongoose.model('Discussion', discussionSchema);
  