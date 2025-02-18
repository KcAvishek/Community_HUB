const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    description: { type: String },
    date: { type: Date, required: true },
    community_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rsvp_count: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
  });
  
  const Event = mongoose.model('Event', eventSchema);
  module.exports = Event;  