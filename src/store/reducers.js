import { combineReducers } from 'redux';
import auth from './modules/auth/slice';
import loading from './modules/loading/slice';
import heroes from './modules/heroes/slice';
import config from './modules/config/slice';

const reducers = combineReducers({
  auth,
  loading,
  heroes,
  config
});

export default reducers;
