const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  paused: { type: Boolean, default: false },
  forceOpen: { type: Boolean, default: false },
  pauseText: { type: String, default: 'SIGNAL PAUSED' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
