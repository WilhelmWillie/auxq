import React, { Component } from 'react';

import YouTube from 'react-youtube';

import '../styles/Song.css';

class Song extends Component {
  constructor(props) {
      super(props);

      this._deleteSong = this._deleteSong.bind(this);
  }

  _deleteSong() {
    this.props.socket.emit('song:remove', this.props.qId, this.props.masterKey, this.props.song._id);
  }

  render() {
    const isTopSong = (this.props.index === 0);
    const isMaster = this.props.isMaster;
    const song = this.props.song;

    const opts = {
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h4>{song.title} by {song.artist}</h4>
        </div>

        <div className='panel-body'>
          {(isTopSong && isMaster) ? (
            <YouTube 
              videoId={song.yt_id} 
              opts={opts} 
              onEnd={this._deleteSong}
              className='yt'
            />
          ) : (
            <img 
              src={'http://img.youtube.com/vi/' + song.yt_id + '/hqdefault.jpg'} 
              alt={song.title + ' by ' + song.artist} 
              className='img-responsive' 
            />
          )}
        </div>

        {(isMaster) ? (
          <div className='panel-footer text-right'>
            <button className='btn btn-danger' onClick={this._deleteSong} >Delete</button>
          </div>
        ) : (null)}
        
      </div>
    );
  }
}

export default Song;
