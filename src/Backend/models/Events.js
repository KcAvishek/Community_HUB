const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    date: { type: Date, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;