import React, { Component } from 'react';

import '../styles/Alert.css';

class Alert extends Component {
  render() {
    return (
      <div className={'alert alert-' + this.props.type}> 
        <p><b>Alert: </b> {this.props.message}</p>
      </div>
    )
  }
}

export default Alert;