const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    submitted_at: { type: Date, default: Date.now },
    reviewed_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewed_at: { type: Date }
  });
  
  const Application = mongoose.model('Application', applicationSchema);
  