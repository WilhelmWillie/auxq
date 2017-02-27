import React, { Component } from 'react';

import { Router, Route, browserHistory } from 'react-router'

import Header from './components/Header';
import Landing from './components/Landing';
import SongQueue from './components/SongQueue';
import JoinQueue from './components/JoinQueue';

class App extends Component {
  render() {
    return (
      <div id='app'>
        <Header />

        <Router history={browserHistory}>
          <Route path='/' component={Landing} />
          <Route path='/q/:id' component={SongQueue} />
          <Route path='/q/:id/master' component={SongQueue} master={true}/> 
          <Route path='/join' component={JoinQueue} />
        </Router>
      </div>
    )
  }
}

export default App;