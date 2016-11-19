/**
 * Created by afei on 2016/10/18.
 */
import React, { Component, PropTypes } from 'react';
import socket from '../socket';
import { Link } from 'react-router';
import './signin.less';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.signIn = this.signIn.bind(this);
    this.doSignIn = this.doSignIn.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount () {
    socket.on('signIn', this.doSignIn);
    this.$logInPane.addEventListener('keydown', this.handleKeyDown);
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

  doSignIn (data) {
    if (data.status === 'success') {
      this.context.router.push('/chat');
      this.$logInPane.removeEventListener('click', this.handleKeyDown);
    } else {
      alert(data.err);
    }
  }

  render() {
    return (
      <div className="login-pane" ref={el => {this.$logInPane = el}}>
        <div className="form-item">
          <i className="icon-user" />
          <input ref={el => {this.$username = el}} />
        </div>
        <div className="form-item">
          <i className="icon-lock" />
          <input ref={el => {this.$password = el}} type="password" />
        </div>
        <button onClick={this.signIn}>登&nbsp;&nbsp;录</button>
        <label className="hint">没有账号？<Link to="/signUp">注册</Link></label>
      </div>
    )
  }

}