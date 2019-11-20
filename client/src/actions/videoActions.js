import { VIDEO_LOADED, VIDEO_FAILED, LOAD_VIDEO } from './types';
import axios from 'axios';

export const loadVideo = videoId => async dispatch => {
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
    dispatch({
      type: VIDEO_FAILED
    });
  }
};
