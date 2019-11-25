import axios from 'axios';
import { ERROR } from 'video-react/lib/actions/video';

export const updateProfilePicture = (formData, history) => async dispatch => {
  try {
    await axios.post('/api/users/profilePicture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    history.push('/videos');
  } catch (err) {
    err.response.data.messages.forEach(message => {
      dispatch({
        type: ERROR,
        payload: message
      });
    });
  }
};
