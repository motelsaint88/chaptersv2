const express = require('express');
const router = express.Router();
const SiteConfig = require('../models/SiteConfig');
const Ad = require('../models/Ad');
const { protect, adminOnly } = require('../middleware/auth');

async function getConfigDoc() {
  let cfg = await SiteConfig.findOne().sort({ updatedAt: -1 });
  if (!cfg) cfg = await SiteConfig.create({});
  return cfg;
}

function bdPhase() {
  const now = new Date();
  const bd = new Date(now.getTime() + 6 * 60 * 60 * 1000);
  const h = bd.getUTCHours();
  if (h >= 19 || h < 5) return 'live';
  if (h >= 17 && h < 19) return 'pre';
  return 'off';
}

function publicConfig(cfg) {
  const phase = bdPhase();
  let status = phase;
  let label = phase === 'live' ? 'IS LIVE' : phase === 'pre' ? 'PRE-BOARDING' : 'RETURNS 19:00';
  let open = phase === 'live';
  if (cfg.forceOpen && !cfg.paused) { status = 'live'; label = 'IS LIVE'; open = true; }
  if (cfg.paused) { status = 'paused'; label = cfg.pauseText || 'SIGNAL PAUSED'; open = false; }
  return { paused: cfg.paused, forceOpen: cfg.forceOpen, pauseText: cfg.pauseText, phase, status, label, open };
}

router.get('/config', async (req, res) => {
  try {
    const cfg = await getConfigDoc();
    const ad = await Ad.findOne({ active: true }).sort({ updatedAt: -1, createdAt: -1 });
    res.json({ config: publicConfig(cfg), ad });
  } catch (err) {
    res.status(500).json({ message: 'Station signal failed.' });
  }
});

router.use(protect, adminOnly);

router.put('/config', async (req, res) => {
  try {
    const payload = {
      paused: !!req.body.paused,
      forceOpen: !!req.body.forceOpen,
      pauseText: (req.body.pauseText || 'SIGNAL PAUSED').toString().slice(0, 40),
      updatedAt: new Date()
    };
    let cfg = await getConfigDoc();
    cfg = await SiteConfig.findByIdAndUpdate(cfg._id, payload, { new: true });
    res.json({ message: 'Signal board updated.', config: publicConfig(cfg) });
  } catch (err) {
    res.status(500).json({ message: 'Signal update failed.' });
  }
});

router.post('/ad', async (req, res) => {
  try {
    const { title = '', subtitle = '', image = '', link = '', active = true } = req.body;
    if (!image) return res.status(400).json({ message: 'Ad image required.' });
    if (active) await Ad.updateMany({}, { active: false });
    const ad = await Ad.create({ title, subtitle, image, link, active, createdBy: req.user._id, updatedAt: new Date() });
    res.json({ message: 'Ad posted.', ad });
  } catch (err) {
    res.status(500).json({ message: 'Ad post failed.' });
  }
});

router.put('/ad/:id', async (req, res) => {
  try {
    const update = { ...req.body, updatedAt: new Date() };
    if (update.active) await Ad.updateMany({ _id: { $ne: req.params.id } }, { active: false });
    const ad = await Ad.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ message: 'Ad updated.', ad });
  } catch (err) {
    res.status(500).json({ message: 'Ad update failed.' });
  }
});

router.delete('/ad/:id', async (req, res) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ad removed.' });
  } catch (err) {
    res.status(500).json({ message: 'Ad removal failed.' });
  }
});

module.exports = router;
