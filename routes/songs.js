const express = require('express');
const router = express.Router();
const Song = require('../models/Song');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadSong } = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }).select('-__v');
    res.json({ songs });
  } catch (err) {
    console.error('Song fetch failed:', err);
    res.status(500).json({ message: 'Failed to fetch playlist.' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const q = String(req.query.q || '').trim();
    if (q.length < 2) return res.json({ songs: [] });

    const url = new URL('https://itunes.apple.com/search');
    url.searchParams.set('term', q);
    url.searchParams.set('media', 'music');
    url.searchParams.set('entity', 'song');
    url.searchParams.set('limit', '12');

    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Search failed: ${response.status}`);
    const data = await response.json();
    const songs = (data.results || []).map(item => {
      const title = item.trackName || 'Untitled song';
      const artist = item.artistName || '';
      const query = [title, artist].filter(Boolean).join(' ');
      return {
        id: String(item.trackId || `${title}-${artist}`),
        title,
        artist,
        artwork: item.artworkUrl100 || '',
        previewUrl: item.previewUrl || '',
        itunesUrl: item.trackViewUrl || '',
        spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(query)}`,
        searchQuery: query
      };
    });
    res.json({ songs });
  } catch (err) {
    console.error('Live song search failed:', err.message);
    res.status(500).json({ message: 'Live song search failed.' });
  }
});

router.post('/', protect, adminOnly, (req, res) => {
  uploadSong.single('audio')(req, res, async (uploadErr) => {
    if (uploadErr) {
      console.error('Song multer upload failed:', uploadErr);
      const msg = uploadErr.code === 'LIMIT_FILE_SIZE'
        ? 'Audio file is too large. Use a smaller file under 250MB.'
        : (uploadErr.message || 'Audio upload failed before saving.');
      return res.status(400).json({ message: msg });
    }

    try {
      if (!req.file) return res.status(400).json({ message: 'Choose an audio file first.' });

      const cleanTitle = (req.body.title || '').trim() || path.parse(req.file.originalname).name || 'Untitled track';
      const cleanDescription = (req.body.description || '').trim();

      const song = await Song.create({
        title: cleanTitle,
        description: cleanDescription,
        filename: req.file.filename,
        filepath: `/uploads/songs/${req.file.filename}`,
        uploadedBy: req.user?._id
      });

      res.status(201).json({ message: 'Song uploaded.', song });
    } catch (err) {
      console.error('Song database save failed:', err);
      if (req.file?.path && fs.existsSync(req.file.path)) {
        try { fs.unlinkSync(req.file.path); } catch (_) {}
      }
      res.status(500).json({ message: `Upload reached server but saving failed: ${err.message}` });
    }
  });
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found.' });
    const filePath = path.join(__dirname, '../uploads/songs', song.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song removed.' });
  } catch (err) {
    console.error('Song delete failed:', err);
    res.status(500).json({ message: 'Deletion failed.' });
  }
});

router.put('/:id/play', async (req, res) => {
  try {
    await Song.findByIdAndUpdate(req.params.id, { $inc: { playCount: 1 } });
    res.json({ message: 'Playing.' });
  } catch (err) {
    res.json({ message: 'ok' });
  }
});

module.exports = router;
