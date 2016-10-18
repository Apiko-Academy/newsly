import React from 'react';
import { render } from 'react-dom';

import SignInPage from './components/SignInPage';
import MainLayout from './components/MainLayout';

if (window.signin) {
  render(<SignInPage />, document.getElementById('signin'));
} else if (window.app) {
  render(<MainLayout />, document.getElementById('app'));
}
