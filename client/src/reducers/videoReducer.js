import { VIDEO_LOADED, VIDEO_FAILED, LOAD_VIDEO } from '../actions/types';

const intialState = {
  loading: true,
  video: null
};

export default (state = intialState, { payload, type }) => {
  switch (type) {
    case LOAD_VIDEO:
      return {
        ...state,
        loading: true,
        video: null
      };
    case VIDEO_FAILED:
      return {
        ...state,
        loading: false,
        video: null
      };
    case VIDEO_LOADED:
      return {
        ...state,
        loading: false,
        video: payload
      };
    default:
      return state;
  }
};
