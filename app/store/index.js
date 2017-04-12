import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import initialState from './initialState';
import reducers from '../reducers';
import { fetchAllData } from '../actions';


const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk),
);

store.dispatch(fetchAllData(store.getState().filter));

export default store;
