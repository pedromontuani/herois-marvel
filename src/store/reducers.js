import { combineReducers } from 'redux';
import auth from './modules/auth/slice';
import loading from './modules/loading/slice';
import heroes from './modules/heroes/slice';

const reducers = combineReducers({
  auth,
  loading,
  heroes
});

export default reducers;
