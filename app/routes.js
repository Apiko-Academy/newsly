import React from 'react';
import { Route } from 'react-router';
import Main from './components/MainLayout';
import SingIn from './components/SignInPage';

const Routes = (<div>
  <Route path="/" component={Main} />
  <Route path="signin" component={SingIn} />
</div>);

export default Routes;
