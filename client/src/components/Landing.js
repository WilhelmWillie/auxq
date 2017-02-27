import React, { Component } from 'react';
import { Link } from 'react-router';

import Client from '../Client';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.createQueue = this.createQueue.bind(this);
  }

  createQueue() {
    Client.createQueue((songQ) => {
      this.props.router.push('/q/' + songQ._id + '/master?key=' + songQ.masterKey);
    });
  }

  render() {
    return (
      <div id='landing'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 col-md-offset-2 text-center'>
              <h2>Create AuxQ</h2>

              <p className='lead'>Start a session and let your friends contribute to the vibes</p>
              <button className='btn btn-lg btn-primary' onClick={this.createQueue}>
                Create <i className='glyphicon glyphicon-plus'></i>
              </button>
            </div>

            <div className='col-md-4 text-center'>
              <h2>Join AuxQ</h2>

              <p className='lead'>Join an already existing session and jam</p>
              <Link to={'/join'} className='btn btn-lg btn-primary'>
                Join <i className='glyphicon glyphicon-play'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;