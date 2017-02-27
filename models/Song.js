var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  yt_id: String
});

module.exports = mongoose.model('Song', SongSchema);