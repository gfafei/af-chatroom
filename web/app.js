/**
 * Created by afei on 2016/10/20.
 */
import React, { Component } from 'react';
import './app.less';
import { Link } from 'react-router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setUser = this.setUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  setUser (user) {
    this.state.user = user;
  }

  getUser () {
    return this.state.user;
  }

  render () {
    const children = React.Children.map(this.props.children, (child) => {
      child.props.setUser = this.setUser;
      child.props.getUser = this.getUser;
      return child;
    });
    return (
      <div className="app-pane">
        <Link className="link-home" to="/"><i className="icon-home" />主页</Link>
        {children}
      </div>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
