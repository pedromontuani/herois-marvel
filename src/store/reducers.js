import { combineReducers } from 'redux';
import loader from './modules/loader/slice';

const reducers = combineReducers({
  loader
});

export default reducers;
