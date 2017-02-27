import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Song from './Song';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songs: [
        { 
          title: 'Love',
          artist: 'Lana Del Rey',
          yt_id: '3-NTv0CdFCk'
        },
        {
          title: 'Swang',
          artist: 'Rae Sremmurd',
          yt_id: 'dmJefsOErr0'
        },
        {
          title: 'Lean On',
          artist: 'Major Lazer',
          yt_id: 'YqeW9_5kURI'
        }
      ]
    }

    this.deleteVideo = this.deleteVideo.bind(this);
  }
  
  deleteVideo(index) {
    this.setState({
      songs: this.state.songs.filter((_, i) => i !== index)
    });
  }

  render() {
    const deleteVideo = this.deleteVideo;

    const songs = this.state.songs.map((song, i) => (
      <Song
        key={i}
        title={song.title}
        artist={song.artist}
        yt_id={song.yt_id}
        id={i}
        onEnd={deleteVideo}
      />
    ));

    return (
      <div className='App'>
        <ReactCSSTransitionGroup
          transitionName='test'
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {songs}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default App;
