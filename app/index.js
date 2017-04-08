import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import Main from './components/MainLayout';
import SingIn from './components/SignInPage';

import store from './store';

const App = () => (<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/signin" component={SingIn} />
    <Route path="*" component={() => { /* handle 404 */ }} />
  </Router>
</Provider>);

render(<App />, document.getElementById('app'));
