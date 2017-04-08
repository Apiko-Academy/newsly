import React from 'react';
import { Route } from 'react-router';
import Main from './components/MainLayout';
import SingIn from './components/SignInPage';

const Routes = (<Route path="/" component={Main}>
  <Route path="/signin" component={SingIn} />
  <Route path="*" component={() => {}} />
</Route>);

export default Routes;
