/**
 * Created by afei on 2016/11/18.
 */
import React, { Component, PropType } from 'react';
import socket from '../socket';
import { Link } from 'react-router';
import './signup.less';

export default class SignUp extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.signUp = this.signUp.bind(this);
    this.doSignUp = this.doSignUp.bind(this);
  }

  componentWillMount () {
    socket.on('signUp', this.doSignUp);
  }

  signUp () {
    const username = this.$username.value;
    const password = this.$password.value;
    const rePassword = this.$rePassword.value;
    if (!/^\S{6,}$/.test(password)) {
      return alert('密码至少6位');
    }
    if (rePassword !== password) {
      return alert('两次密码输入不一致');
    }
    socket.emit('signUp', { username, password });
  }

  doSignUp (data) {
    if (data.status === 'success') {
      this.props.setUser(data.user);
      this.context.router.push('/chat');
    } else {
      alert(data.err);
    }
  }


  render () {
    return (
      <div className="signup-pane">
        <div className="form-item">
          <input ref={el => {this.$username = el}} placeholder="用户名" />
        </div>
        <div className="form-item">
          <input ref={el => {this.$password = el}} placeholder="密码，至少6位" type="password" />
        </div>
        <div className="form-item">
          <input ref={el => {this.$rePassword = el}} placeholder="再次输入密码" type="password" />
        </div>
        <button onClick={this.signUp}>注&nbsp;&nbsp;册</button>
        <label className="hint">已有账号？<Link to="/signIn">直接登录</Link></label>
      </div>
    )
  }
}

SignUp.contextTypes = {
  router: React.PropTypes.object.isRequired,
};