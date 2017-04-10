import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import initialState from './initialState';
import reducers from '../reducers';
import * as actions from '../actions';

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk),
);

store.dispatch(actions.fetchUser());
store.dispatch(actions.fetchBoards());
store.dispatch(actions.fetchActions());
store.dispatch(actions.fetchUsers());

export default store;
