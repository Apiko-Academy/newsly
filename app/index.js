import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
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
    </Router>
  </Provider></MuiThemeProvider>);

render(<App />, document.getElementById('app'));
