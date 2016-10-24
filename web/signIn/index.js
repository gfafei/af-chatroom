/**
 * Created by afei on 2016/10/18.
 */
import React, { Component, PropTypes } from 'react';
import socket from '../socket';
import './signin.less';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signIn = this.signIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.signIn();
    }
  }

  signIn() {
    const username = this.$username.value;
    const password = this.$password.value;
    socket.emit('signIn', { username, password });
  }

  render() {
    return (
      <div className="login-pane">
        <div className="form-item">
          <i className="icon-user" />
          <input ref={el => {this.$username = el}} />
        </div>
        <div className="form-item">
          <i className="icon-lock" />
          <input ref={el => {this.$password = el}} type="password" />
        </div>
        <button onClick={this.signIn}>登&nbsp;&nbsp;录</button>
      </div>
    )
  }

}