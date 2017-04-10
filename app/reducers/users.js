import * as types from '../actions/types';
import initialState from '../store/initialState';

function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.FETCH_USERS: {
      return action.users;
    }

    default: {
      return state;
    }
  }
}

export default usersReducer;
