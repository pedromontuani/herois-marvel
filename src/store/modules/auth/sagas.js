import { call, put, all, takeLatest } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import { loginSuccess, logoutSuccess, setLoading } from './slice';
import ActionTypes from '~/store/actionTypes';
import { createUser, isAuthenticated, signIn, signOut } from '~/services/auth';

function* offlineLogin() {
  yield put(setLoading(true));
  try {
    const user = yield call(isAuthenticated);
    if (!!user) {
      yield put(loginSuccess({ user }));
    }
  } catch (e) {
    yield call(
      Toast.show,
      'Ocorreu um erro. Por favor, verifique sua conexão.'
    );
  } finally {
    yield put(setLoading(false));
  }
}

function* login({ payload }) {
  const { email, password } = payload;
  yield put(setLoading(true));
  try {
    const { user } = yield call(signIn, {
      email,
      password
    });

    yield put(loginSuccess({ user }));
  } catch (e) {
    console.log(e);
    yield call(Toast.show, 'Ocorreu um erro. Por favor, tente novamente.');
  }
  yield put(setLoading(false));
}

function* signUp({ payload }) {
  const { name, email, password, photo } = payload;
  yield put(setLoading(true));
  try {
    const user = yield call(createUser, {
      name,
      email,
      password,
      photo
    });

    yield put(loginSuccess({ user }));
  } catch (e) {
    console.log(e);
    yield call(Toast.show, 'Ocorreu um erro. Por favor, tente novamente.');
  }
  yield put(setLoading(false));
}

function* logout() {
  yield put(setLoading(true));
  try {
    yield call(signOut);
    yield put(logoutSuccess());
  } catch (e) {
    console.log(e);
  }
  yield put(setLoading(false));
}

export default all([
  takeLatest(ActionTypes.AUTH_SIGN_UP, signUp),
  takeLatest(ActionTypes.AUTH_OFFLINE_LOGIN, offlineLogin),
  takeLatest(ActionTypes.AUTH_LOGIN, login),
  takeLatest(ActionTypes.AUTH_LOGOUT, logout)
]);
