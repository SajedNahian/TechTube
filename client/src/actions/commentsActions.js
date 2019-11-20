import axios from 'axios';
import { addError } from './errorsActions';
import { LOAD_COMMENTS, COMMENTS_FAILED, COMMENTS_LOADED } from './types';

export const loadComments = videoId => async dispatch => {
  dispatch({
    type: LOAD_COMMENTS
  });

  try {
    const response = await axios.get(`/api/videos/${videoId}/comments`);
    // console.log(`/api/videos/${videoId}/comments`);
    dispatch({
      type: COMMENTS_LOADED,
      payload: response.data.comments
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_FAILED
    });
  }
};

export const postComment = (videoId, text) => async dispatch => {
  try {
    await axios.post(`/api/videos/${videoId}/comments`, { text });
    dispatch(loadComments(videoId));
  } catch (err) {
    err.response.data.errors.forEach(error => {
      dispatch(addError(error));
    });
  }
};
