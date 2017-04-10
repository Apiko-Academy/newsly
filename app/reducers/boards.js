import * as types from '../actions/types';
import initialState from '../store/initialState';

function boardsReducer(state = initialState.boards, action) {
  switch (action.type) {
    case types.FETCH_BOARDS: {
      return action.boards;
    }

    default: {
      return state;
    }
  }
}

export default boardsReducer;
