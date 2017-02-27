var mongoose = require('mongoose');
var shortid = require('shortid');
var randomstring = require('randomstring');

var Song = require('./Song');

var SongQueueSchema = new mongoose.Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  masterKey: {
    type: String,
    'default': randomstring.generate
  }
});

module.exports = mongoose.model('SongQueue', SongQueueSchema);