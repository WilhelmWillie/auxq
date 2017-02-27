/*eslint no-useless-escape: "off"*/

import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Alert from './Alert';

class AddSong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      artist: '',
      youtube: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.baseState = this.state;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const title = this.state.title;
    const artist = this.state.artist;
    const yt_id = this.validateYouTubeURL(this.state.youtube);

    if (title === undefined || title === '') {
      this.setState({ error: 'Invalid title. '});
      return;
    }

    if (artist === undefined || artist === '') {
      this.setState({ error: 'Invalid artist. '});
      return;
    }

    if (yt_id === false) {
      this.setState({ error: 'Invalid URL. '});
      return;
    }

    const data = {
      title: title,
      artist: artist,
      yt_id: yt_id
    }

    this.props.socket.emit('song:add', this.props.qId, data);

    this.setState(this.baseState);
  }

  validateYouTubeURL(url) {
    if (url !== undefined || url !== '') {        
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        } else {
            return false;
        }
    }
  }

  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h4>Add Song</h4>
        </div>

        <div className='panel-body'>
          <ReactCSSTransitionGroup
            transitionName='alert'
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}> 
          {(this.state.error) ? (
              <Alert message={this.state.error} type='danger' key='errorAlert'/>
          ) : (null)}
        </ReactCSSTransitionGroup>

          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label>Title</label>

              <input className='form-control' type='text' placeholder='Love' name='title' onChange={this.handleInputChange} value={this.state.title}></input>
            </div>
            
            <div className='form-group'>
              <label>Artist</label>

              <input className='form-control' type='text' placeholder='Lana Del Rey' name='artist' onChange={this.handleInputChange} value={this.state.artist}></input>
            </div>

            <div className='form-group'>
              <label>YouTube URL</label>

              <input className='form-control' type='text' placeholder='https://youtu.be/3-NTv0CdFCk' name='youtube' onChange={this.handleInputChange} value={this.state.youtube}></input>
            </div>

            <input className='btn btn-md btn-primary text-right' type='submit' value='Add'></input>
          </form>
        </div>
      </div>
    )
  }
}

export default AddSong;