import { combineReducers } from 'redux';
import auth from './modules/auth/slice';
import loading from './modules/loading/slice';

const reducers = combineReducers({
  auth,
  loading
});

export default reducers;
