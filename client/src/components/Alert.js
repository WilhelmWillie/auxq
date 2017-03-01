import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../styles/Alert.css';

class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    }

    this.hide = this.hide.bind(this);
  }

  hide() {
    this.setState({
      show: false
    })

    console.log(this.state.show);
  }

  render() {
    return (
      <ReactCSSTransitionGroup
                transitionName='fade'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
        {(this.state.show) ? (
          <div className={'alert alert-' + this.props.type} onClick={this.hide} key='alerty'> 
            <p>{this.props.message} <em>(Click to dismiss)</em></p>
          </div>
        ) : (null)}
      </ReactCSSTransitionGroup>
    )
  }
}

export default Alert;