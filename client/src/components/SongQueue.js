import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Song from './Song';
import AddSong from './AddSong';
import EmptyQueue from './EmptyQueue';
import Alert from './Alert';

import Client from '../Client';

import io from 'socket.io-client';

class SongQueue extends Component {
  constructor(props) {
    super(props)

    this.state = {
      songs: [],
      master: this.props.route.master,
      masterKey: this.props.location.query.key
    };

    Client.getSongQueue(this.props.params.id, (songQ) => {
      if (songQ.doesNotExist) {
        this.props.router.push('/join?invalid=true&bad_id=' + this.props.params.id);
      } else {
        this.setState({
          songs: songQ.songs
        })
      }
    });

    this.delete = this.delete.bind(this);
    this.push = this.push.bind(this);

    this.socket = io('/');
  }  

  componentDidMount() {
    // Ping the server and check to make sure the master key works
    Client.checkMasterKey(this.props.params.id, this.state.masterKey, (resp) => {
      if (resp.isMaster === false) {
        this.props.router.push('/q/' + this.props.params.id);

        this.setState({
          master: false
        })
      } else {
        this.setState({
          master: true
        })
      }
    });

    // On connection, send a signal to join the queue's stream
    this.socket.on('connect', data => {
      this.socket.emit('joinQ', this.props.params.id);
    });

    // When we receive a 'song:add' symbol, add the data to our song array
    this.socket.on('song:add', this.push);

    // When we receive a 'song:remove' symbol, remove the song from the array
    this.socket.on('song:remove', this.delete);
  }

  // Delete element in the specified index
  delete(_id) {
    this.setState({
      songs: this.state.songs.filter((song, i) => song._id !== _id)
    });
  }

  // Add new songs to the song array
  push(data) {
    const _songs = this.state.songs;
    _songs.push(data);

    this.setState({
      songs: _songs
    })
  }

  render() {
    const songs = this.state.songs.map((song, i) => (
      <Song
        key={song._id}
        song={song}
        index={i}
        socket={this.socket}
        qId={this.props.params.id}
        masterKey={this.state.masterKey}
        isMaster={this.state.master}
      />
    ));
 
    return (
      <div id='songQueue'>
        <div className='container'>
          <div className='col-md-5 col-md-push-7'>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h4>AuxQ ID: {this.props.params.id}</h4>
              </div>

              <div className='panel-body'>
                <label>Share URL (Share with friends)</label>

                <input className='form-control' type='text' value={window.location.host + '/q/' + this.props.params.id} readOnly></input>

                {(this.state.master === true) ? (
                  <div>
                    <br/>

                    <Alert message={'You are the master of this AuxQ! ' +
                'This means you are the main source of audio and can delete songs. ' +
                'Only way to access the master page is to use the master URL. ' +
                'Keep this to yourself or to people you trust with control!'} 
                type='info' key='errorAlert'/>  

                    <label>Master URL (Keep for yourself)</label>

                    <input className='form-control' type='text' value={window.location.host + '/q/' + this.props.params.id + '/master?key=' + this.state.masterKey} readOnly></input>
                  </div>
                ) : (null)}
              </div>
            </div>

            <AddSong socket={this.socket} qId={this.props.params.id} />
          </div>

          <div className='col-md-7 col-md-pull-5'>
            <ReactCSSTransitionGroup
                transitionName='fade'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
              {(this.state.songs.length !== 0) ? (songs) : (<EmptyQueue key='emptyQueue'/>)}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default SongQueue;