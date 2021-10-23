import { createSlice } from '@reduxjs/toolkit';
import ActionTypes from '~/store/actionTypes';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: null,
    isLoading: null
  },
  reducers: {
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    loginSuccess(state, { payload }) {
      const { user } = payload;
      state.user = user;
      state.isAuthenticated = true;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const offlineLogin = () => ({
  type: ActionTypes.AUTH_OFFLINE_LOGIN
});

export const login = (email, password) => ({
  type: ActionTypes.AUTH_LOGIN,
  payload: {
    email,
    password
  }
});

export const signUp = ({ name, email, password, photo }) => ({
  type: ActionTypes.AUTH_SIGN_UP,
  payload: {
    name,
    email,
    password,
    photo
  }
});

export const logout = () => ({
  type: ActionTypes.AUTH_LOGOUT
});

const { actions, reducer } = authSlice;

export const { setLoading, loginSuccess, logoutSuccess } = actions;

export default reducer;
