import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { Router, Route, browserHistory } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './components/MainLayout';
import SingIn from './components/SignInPage';
import store from './store';

injectTapEventPlugin();

const App = () => (<MuiThemeProvider muiTheme={getMuiTheme()}>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main} />
      <Route path="/signin" component={SingIn} />
      <Route path="/auth/trello" onEnter={onAuthEnter} />
      <Route path="*" component={() => <div>404</div>} />
    </Router>
  </Provider></MuiThemeProvider>);

render(<App />, document.getElementById('app'));

function onAuthEnter(nextState, replace) {
  const requestData = {
    oauth_token: nextState.location.query.oauth_token,
    oauth_verifier: nextState.location.query.oauth_verifier,
  };

  axios.post('/auth/trello', requestData);

  replace('/');
}
