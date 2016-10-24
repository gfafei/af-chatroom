/**
 * Created by afei on 2016/10/20.
 */
import React, { Component } from 'react';
import socket from './socket';
import './app.less';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    this.context.router.push('/');
    socket.on('signIn', this.signIn)
  }

  signIn(data) {
    if (data.status === 'success') {
      this.context.router.push('/chat');
    } else {
      alert(data.err);
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
