import {
  LOAD_COMMENTS,
  COMMENTS_LOADED,
  COMMENTS_FAILED
} from '../actions/types';

const initialState = {
  loading: true,
  comments: []
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case LOAD_COMMENTS:
      return { ...state, loading: true, comments: [] };
    case COMMENTS_LOADED:
      return { ...state, loading: false, comments: payload };
    case COMMENTS_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
