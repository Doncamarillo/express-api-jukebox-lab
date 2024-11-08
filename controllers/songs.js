const Song = require('../models/song.js');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const createdSong = await Song.create(req.body);
    res.status(201).json(createdSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const foundSongs = await Song.find();
    res.status(200).json(foundSongs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:songId', async (req, res) => {
  try {
    const foundSong = await Song.findById(req.params.songId);

    if (!foundSong) {
      res.status(404).json({ error: 'Song not found.' });
      return;
    }

    res.status(200).json(foundSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:songId', async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.songId);

    if (!deletedSong) {
      res.status(404).json({ error: 'Song not found.' });
      return;
    }

    res.status(200).json({ message: `${deletedSong.title} has been deleted.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:songId', async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.songId, req.body, { new: true });

    if (!updatedSong) {
      res.status(404).json({ error: 'Song not found.' });
      return;
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
