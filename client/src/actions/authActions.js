import { USER_AUTHENTICATED, USER_AUTHENTICATION_FAILED } from './types';
import axios from 'axios';

export const authenticateUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/users');
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
