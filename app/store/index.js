import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import initialState from './initialState';
import reducers from '../reducers';

export default createStore(
  reducers,
  initialState,
  applyMiddleware(thunk),
);
