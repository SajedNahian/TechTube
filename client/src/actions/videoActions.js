import {
  VIDEO_LOADED,
  VIDEO_FAILED,
  LOAD_VIDEO,
  UPDATE_VIDEO_RATING
} from './types';
import { addError } from './errorsActions';
import axios from 'axios';

export const loadVideo = (videoId, history) => async dispatch => {
  dispatch({
    type: LOAD_VIDEO
  });

  try {
    const response = await await axios.get(`/api/videos/${videoId}`);
    dispatch({
      type: VIDEO_LOADED,
      payload: response.data.video
    });
  } catch (err) {
    history.push('/videos');
    err.response.data.errors.forEach(error => dispatch(addError(error)));
    dispatch({
      type: VIDEO_FAILED
    });
  }
};

export const rateVideo = (videoId, value) => async dispatch => {
  try {
    await await axios.post(`/api/videos/${videoId}/rate`, {
      value
    });
    dispatch({
      type: UPDATE_VIDEO_RATING,
      payload: value
    });
  } catch (err) {
    dispatch(addError('You must be logged in to rate videos'));
  }
};
