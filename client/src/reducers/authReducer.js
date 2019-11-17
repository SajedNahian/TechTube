import {
  USER_AUTHENTICATED,
  USER_AUTHENTICATION_FAILED
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload
      };
    case USER_AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};
