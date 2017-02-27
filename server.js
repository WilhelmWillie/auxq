var express = require('express');

// Set up app and socket.io server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

// Database set up
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGO_URL);
} else {
  mongoose.connect('localhost/auxq');
}

var api = require('./routes/api');
app.use('/api', api);

// Only serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

var Song = require('./models/Song');
var SongQueue = require('./models/SongQueue');

// Sockets!
io.sockets.on('connection', function(socket) {
    // Once a client has connected, we expect to get a ping from them saying what queue they want to join
    socket.on('joinQ', function(q) {
        socket.join(q);
    });

    // When we receive a ping from a client telling to add a song, we update the database then send the data back through Sockets  
    socket.on('song:add', function(qId, data) {
      // Create a Song then update the appropriate SongQueue
      SongQueue.count({_id: qId}, function(err, count) {
        if (count > 0) {
          Song.create({
            title: data.title,
            artist: data.artist,
            yt_id: data.yt_id
          }, function(err, song) {
            SongQueue.update(
              {_id: qId},
              {$push: {'songs': song}},
              {upsert: true}, 
              function(err, data) {
                if (!err) {
                  // We've created the song and it has been inserted, let's ping the data back to the client through Sockets
                  io.sockets.in(qId).emit('song:add', song);
                }
              });
          });
        }
      });
    });

    // When we receive a ping from a client to delete a song, we update the database and send the data back through Sockets
    socket.on('song:remove', function(qId, qKey, _id) {
      SongQueue.findOneAndUpdate({_id: qId, masterKey: qKey}, {$pull: {songs: _id}}, function(err, data) {
        if (!err && data !== null) {
          io.sockets.in(qId).emit('song:remove', _id);
        }
      })
    });
});

server.listen(app.get('port'), () => {
  console.log('Server started at http://localhost:' + app.get('port'));
});
