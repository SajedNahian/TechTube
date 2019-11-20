import {
  USER_AUTHENTICATED,
  USER_AUTHENTICATION_FAILED
} from '../actions/types';

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false
      };
    case USER_AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    default:
      return state;
  }
};
