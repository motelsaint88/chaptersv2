const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Confession = require('../models/Confession');
const User = require('../models/User');
const { protect, modOrAdmin } = require('../middleware/auth');

router.use(protect, modOrAdmin);

// @GET /api/moderator/stats
router.get('/stats', async (req, res) => {
  try {
    const [pendingConf, pendingReports, messageReports, peopleReports, totalReports] = await Promise.all([
      Confession.countDocuments({ status: 'pending' }),
      Report.countDocuments({ status: 'pending' }),
      Report.countDocuments({ status: 'pending', type: 'message' }),
      Report.countDocuments({ status: 'pending', type: { $in: ['passenger', 'people'] } }),
      Report.countDocuments()
    ]);
    res.json({ pendingConf, pendingReports, messageReports, peopleReports, totalReports });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load moderator stats.' });
  }
});

// @GET /api/moderator/reports
router.get('/reports', async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    if (type) query.type = type === 'people' ? { $in: ['passenger', 'people'] } : type;
    const total = await Report.countDocuments(query);
    const reports = await Report.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('reportedBy', 'name email')
      .populate('reviewedBy', 'name');
    res.json({ reports, total });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reports.' });
  }
});

// @GET /api/moderator/users - search passengers for temporary suspension
router.get('/users', async (req, res) => {
  try {
    const { search = '', limit = 20 } = req.query;
    const query = search ? {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('name email role isBanned banReason banUntil banType');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Failed to search passengers.' });
  }
});

// @PUT /api/moderator/users/:id/suspend - temporary suspension only
router.put('/users/:id/suspend', async (req, res) => {
  try {
    const { hours = 24, reason = '' } = req.body;
    const safeHours = Math.max(1, Math.min(parseInt(hours) || 24, 168));
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Passenger not found.' });
    if (user.role === 'admin' || user.email === 'n.i.farhan44@gmail.com') {
      return res.status(403).json({ message: 'Cannot suspend admin.' });
    }
    user.isBanned = true;
    user.banType = 'temporary';
    user.banUntil = new Date(Date.now() + safeHours * 60 * 60 * 1000);
    user.banReason = reason || `Temporarily suspended by station staff for ${safeHours} hours.`;
    user.suspendedBy = req.user._id;
    await user.save();
    await Report.create({
      reportedBy: req.user._id,
      type: 'people',
      reportedUser: `${user.name} <${user.email}>`,
      reason: `Temporary suspension: ${user.banReason}`,
      status: 'pending'
    });
    res.json({ message: `Passenger temporarily suspended for ${safeHours} hours.`, user });
  } catch (err) {
    res.status(500).json({ message: 'Temporary suspension failed.' });
  }
});

// @PUT /api/moderator/reports/:id
router.put('/reports/:id', async (req, res) => {
  try {
    const { status, note } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status, reviewNote: note || '', reviewedBy: req.user._id, reviewedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Report updated.', report });
  } catch (err) {
    res.status(500).json({ message: 'Update failed.' });
  }
});

// @GET /api/moderator/confessions/pending
router.get('/confessions/pending', async (req, res) => {
  try {
    const confessions = await Confession.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .populate('submittedBy', 'name email');
    res.json({ confessions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending confessions.' });
  }
});

// @PUT /api/moderator/confessions/:id/review
router.put('/confessions/:id/review', async (req, res) => {
  try {
    const { action, note } = req.body;
    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action.' });
    }
    const confession = await Confession.findByIdAndUpdate(
      req.params.id,
      {
        status: action === 'approve' ? 'approved' : 'rejected',
        reviewedBy: req.user._id,
        reviewNote: note || '',
        reviewedAt: new Date()
      },
      { new: true }
    );
    res.json({ message: `Confession ${action}d.`, confession });
  } catch (err) {
    res.status(500).json({ message: 'Review failed.' });
  }
});

module.exports = router;
