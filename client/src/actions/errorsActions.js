import { ADD_ERROR, REMOVE_ERROR, CLEAR_ERRORS } from './types';
const uuidv1 = require('uuid/v1');

export const addError = message => dispatch => {
  const id = uuidv1();
  dispatch({ type: ADD_ERROR, payload: { id, message } });
  window.scrollTo(0, 0);
  setTimeout(() => {
    dispatch({
      type: REMOVE_ERROR,
      payload: id
    });
  }, 8000);
};

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
