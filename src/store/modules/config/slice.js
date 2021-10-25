import { createSlice } from '@reduxjs/toolkit';

const favSlice = createSlice({
  name: 'config',
  initialState: {
    API_PRIVATE_KEY: null,
    API_PUBLIC_KEY: null
  },
  reducers: {
    setKeys(state, { payload }) {
      const { API_PRIVATE_KEY, API_PUBLIC_KEY } = payload;
      state.API_PRIVATE_KEY = API_PRIVATE_KEY;
      state.API_PUBLIC_KEY = API_PUBLIC_KEY;
    }
  }
});

const { actions, reducer } = favSlice;

export const { setKeys } = actions;

export default reducer;
