import {
  USER_AUTHENTICATED,
  USER_AUTHENTICATION_FAILED,
  LOADING_USER
} from '../actions/types';

const initialState = {
  loading: true,
  isAuthenticated: false,
  user: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_USER:
      return initialState;
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
