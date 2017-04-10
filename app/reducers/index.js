import { combineReducers } from 'redux';
import users from './users';
import boards from './boards';
import actions from './actions';
import user from './user';
import filter from './filter';

export default combineReducers({
  users,
  boards,
  actions,
  user,
  filter,
});
