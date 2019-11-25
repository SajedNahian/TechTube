import {
  VIDEO_LOADED,
  VIDEO_FAILED,
  LOAD_VIDEO,
  UPDATE_VIDEO_RATING,
  SUBSCRIBE_SUCCESS,
  UNSUBSCRIBE_SUCCESS,
  VIDEOS_LOADED
} from '../actions/types';

const intialState = {
  loading: true,
  video: null,
  videos: null
};

export default (state = intialState, { payload, type }) => {
  switch (type) {
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        video: {
          ...state.video,
          author: {
            ...state.video.author,
            subscribers: state.video.author.subscribers + 1,
            subscribed: true
          }
        }
      };
    case UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        video: {
          ...state.video,
          author: {
            ...state.video.author,
            subscribers: state.video.author.subscribers - 1,
            subscribed: false
          }
        }
      };
    case LOAD_VIDEO:
      return {
        ...state,
        loading: true,
        video: null
      };
    case VIDEO_FAILED:
      return {
        ...state,
        loading: true,
        video: null
      };
    case VIDEO_LOADED:
      return {
        ...state,
        loading: false,
        video: payload
      };
    case UPDATE_VIDEO_RATING:
      return {
        ...state,
        video: {
          ...state.video,
          userRate: payload,
          likes:
            state.video.userRate !== payload
              ? payload === 1
                ? state.video.likes + 1
                : state.video.likes - (state.video.userRate === 0 ? 0 : 1)
              : state.video.likes,
          dislikes:
            state.video.userRate !== payload
              ? payload === -1
                ? state.video.dislikes + 1
                : state.video.dislikes - (state.video.userRate === 0 ? 0 : 1)
              : state.video.dislikes
        }
      };
    case VIDEOS_LOADED:
      return {
        ...state,
        loading: false,
        videos: payload
      };
    default:
      return state;
  }
};
