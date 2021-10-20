import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'loader',
  initialState: {
    visible: false
  },
  reducers: {
    setLoading(state, { payload }) {
      state.visible = !!payload;
    }
  }
});

const { actions, reducer } = authSlice;

export const { setLoading } = actions;

export default reducer;
