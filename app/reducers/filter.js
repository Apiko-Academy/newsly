import * as types from '../actions/types';
import initialState from '../store/initialState';

function filterReducer(state = initialState.filter, action) {
  switch (action.type) {
    case types.UPDATE_FILTER: {
      return Object.assign({}, state, action.filter);
    }

    default: {
      return state;
    }
  }
}

export default filterReducer;
