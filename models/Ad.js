const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  subtitle: { type: String, trim: true, default: '' },
  image: { type: String, trim: true, default: '' },
  link: { type: String, trim: true, default: '' },
  active: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);
