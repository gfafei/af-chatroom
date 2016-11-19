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
    this.setUser = this.setUser.bind(this);
  }

  setUser (user) {
    this.state.user = user;
  }

  render() {
    const children = this.props.children.map(function (child) {
      child.props.setUser = this.setUser;
    });
    return (
      <div className="app-pane">
        {children}
      </div>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
