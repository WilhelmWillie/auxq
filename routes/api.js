var express = require('express');
var router = express.Router();

var SongQueue = require('../models/SongQueue');
var Song = require('../models/Song');

/* Create a SongQueue */
router.post('/q/create', function(req, res) {
  SongQueue.create({
    songs: []
  }, function(err, songQ) {
    if (err) {
      res.json({ error: err });
      return;
    }
    
    res.json(songQ);
  });
});

/* Check if SongQueue matches master key */
router.get('/q/:id/master/:key', function(req, res) {
  SongQueue.findOne({ _id: req.params.id }).exec(function(err, songQ) {
    if (err) {
      res.json({ error: err });
    } else {
      if (songQ) {
        if (songQ.masterKey === req.params.key)
          res.json({isMaster: true, message: 'Valid master key'});
        else
          res.json({isMaster: false, message: 'Invalid master key'});
      } else {
        res.json({doesNotExist: true, message: 'No SongQueue exists with that ID'});
      }
    }
  });
});

/* Get SongQueue messages */
router.get('/q/:id', function(req, res) {
  SongQueue.findOne({ _id: req.params.id }, { masterKey: 0 }).populate('songs').exec(function(err, songQ) {
    if (err) {
      res.json({ error: err });
    } else {

      if (songQ) {
        res.json(songQ);
      } else {
        res.json({doesNotExist: true, message: 'No SongQueue exists with that ID'});
      }
    }
  });
});

/* Post Song to SongQ */
router.post('/q/:id/add', function(req, res) {
  // Create a Song then update the appropriate SongQueue
  SongQueue.count({_id: req.params.id}, function(err, count) {
    if (count > 0) {
      Song.create({
        title: req.body.title,
        artist: req.body.artist,
        yt_id: req.body.yt_id
      }, function(err, song) {
        SongQueue.update(
          {_id: req.params.id},
          {$push: {'songs': song}},
          {upsert: true}, 
          function(err, data) {
            if (err)
              res.json({ error: err });
            else
              res.json(data);
          });
      });
    } else {
      res.json({doesNotExist: true, message: 'No SongQueue exists with that ID'});
    }
  });
});

module.exports = router;