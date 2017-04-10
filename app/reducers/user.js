import * as types from '../actions/types';
import initialState from '../store/initialState';

function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.FETCH_USER: {
      return action.user;
    }

    default: {
      return state;
    }
  }
}

export default userReducer;
