import {
  VIDEO_LOADED,
  VIDEO_FAILED,
  LOAD_VIDEO,
  UPDATE_VIDEO_RATING,
  SUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_SUCCESS,
  VIDEOS_LOADED
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
    await axios.post(`/api/videos/${videoId}/rate`, {
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

export const subscribeToUser = userId => async dispatch => {
  try {
    await axios.post('/api/subscriptions', { to: userId });
    dispatch({
      type: SUBSCRIBE_SUCCESS
    });
  } catch (err) {
    dispatch(addError('You must be logged in to subscribe to users'));
  }
};

export const unsubscribeToUser = userId => async dispatch => {
  try {
    await axios.delete('/api/subscriptions', { data: { to: userId } });
    dispatch({
      type: UNSUBSCRIBE_SUCCESS
    });
  } catch (err) {
    dispatch(addError('You must be logged in to subscribe to users'));
  }
};

export const getVideos = search => async dispatch => {
  dispatch({
    type: LOAD_VIDEO
  });
  try {
    const response = await axios.get(`/api/videos${search}`);
    dispatch({
      type: VIDEOS_LOADED,
      payload: response.data.videos
    });
  } catch (err) {
    dispatch(addError('Something went wrong getting videos'));
  }
};
