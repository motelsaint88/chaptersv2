const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reporterName: { type: String },
  reporterEmail: { type: String },
  type: {
    type: String,
    enum: ['message', 'passenger', 'people'],
    default: 'message'
  },
  reportedUser: { type: String },
  reportedSocketId: { type: String },
  messageText: { type: String, maxlength: 1000 },
  messageSide: { type: String, enum: ['me', 'stranger', 'unknown'], default: 'unknown' },
  messageTime: { type: String },
  reason: { type: String, required: true, maxlength: 500 },
  chatSession: { type: String },
  pageUrl: { type: String },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'actioned', 'dismissed'],
    default: 'pending'
  },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewNote: { type: String },
  createdAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date }
});

module.exports = mongoose.model('Report', reportSchema);
