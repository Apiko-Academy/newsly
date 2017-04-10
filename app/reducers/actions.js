import * as types from '../actions/types';
import initialState from '../store/initialState';

function actionsReducer(state = initialState.actions, action) {
  switch (action.type) {
    case types.FETCH_ACTIONS: {
      return action.actions;
    }

    default: {
      return state;
    }
  }
}

export default actionsReducer;
