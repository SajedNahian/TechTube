import { ADD_ERROR, REMOVE_ERROR, CLEAR_ERRORS } from '../actions/types';
const initialState = [];

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case CLEAR_ERRORS:
      return [];
    case ADD_ERROR:
      return [...state.filter(err => err.message !== payload.message), payload];
    case REMOVE_ERROR:
      return state.filter(error => error.id !== payload);
    default:
      return state;
  }
};
