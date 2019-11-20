import { combineReducers } from 'redux';
import authReducer from './authReducer';
import videoReducer from './videoReducer';
import commentsReducer from './commentsReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  auth: authReducer,
  video: videoReducer,
  comments: commentsReducer,
  errors: errorsReducer
});
