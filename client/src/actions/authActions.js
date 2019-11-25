import {
  USER_AUTHENTICATED,
  USER_AUTHENTICATION_FAILED,
  LOADING_USER
} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import saveAuthToken from '../utils/saveAuthToken';
import { addError, clearErrors } from './errorsActions';

export const authenticateUser = () => async dispatch => {
  dispatch({
    type: LOADING_USER
  });
  try {
    const response = await axios.get('/api/user');
    dispatch({
      type: USER_AUTHENTICATED,
      payload: response.data.user
    });
  } catch (e) {
    dispatch({
      type: USER_AUTHENTICATION_FAILED
    });
  }
};

export const loginUser = formData => async dispatch => {
  try {
    const response = await axios.post('/api/user/login', formData);
    const jwt = response.data.jwt;
    setAuthToken(jwt);
    saveAuthToken(jwt);
    dispatch(authenticateUser());
  } catch (err) {
    dispatch(clearErrors());
    err.response.data.errors.forEach(error => {
      dispatch(addError(error));
    });
  }
};

export const signUpUser = formData => async dispatch => {
  try {
    const response = await axios.post('/api/user/', formData);
    const jwt = response.data.jwt;
    setAuthToken(jwt);
    saveAuthToken(jwt);
    dispatch(authenticateUser());
  } catch (err) {
    dispatch(clearErrors());
    err.response.data.errors.forEach(error => {
      dispatch(addError(error));
    });
  }
};
