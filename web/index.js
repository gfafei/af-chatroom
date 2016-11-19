/**
 * Created by afei on 2016/10/18.
 */
import ReactDOM from 'react-dom';
import Chat from './chat';
import SignIn from './signIn';
import SignUp from './signUp';
import App from './app';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SignIn} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/chat" component={Chat} />
    </Route>
  </Router>,
  document.querySelector('#app')
);
