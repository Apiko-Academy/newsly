import axios from 'axios';
import * as types from './types';
import errorHandler from '../helpers/handleRequestErrors';

function fetchUsersSuccess(users) {
  return {
    type: types.FETCH_USERS,
    users,
  };
}

function fetchBoardsSuccess(boards) {
  return {
    type: types.FETCH_BOARDS,
    boards,
  };
}

function fetchActionsSuccess(actions) {
  return {
    type: types.FETCH_ACTIONS,
    actions,
  };
}

function fetchUserSuccess(user) {
  return {
    type: types.FETCH_USER,
    user,
  };
}

export function fetchUser() {
  return (dispatch) => {
    axios.get(`/api/users/me`)
      .then(({ data }) => {
        dispatch(fetchUserSuccess(data));
      })
      .catch(errorHandler);
  };
}

export function fetchBoards(query) {
  return (dispatch) => {
    axios.get('/api/boards', { params: query })
      .then(({ data }) => {
        dispatch(fetchBoardsSuccess(data));
      })
      .catch(errorHandler);
  };
}

export function fetchUsers(query) {
  return (dispatch) => {
    axios.get('/api/users', { params: query })
      .then(({ data }) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch(errorHandler);
  };
}

export function fetchActions(query) {
  return (dispatch) => {
    axios.get('/api/actions', { params: query })
      .then(({ data }) => {
        dispatch(fetchActionsSuccess(data));
      })
      .catch(errorHandler);
  };
}

export function updateFilters(filter) {
  return (dispatch) => {
    dispatch(fetchUsers(filter));
    dispatch(fetchActions(filter));

    dispatch({
      type: types.UPDATE_FILTER,
      filter,
    });
  };
}

export function fetchAllData(filter = {}) {
  return (dispatch) => {
    dispatch(fetchUser());
    dispatch(fetchUsers(filter));
    dispatch(fetchActions(filter));
    dispatch(fetchBoards(filter));
  };
}
