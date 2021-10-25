import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    visible: false
  },
  reducers: {
    setLoading(state, { payload }) {
      state.visible = !!payload;
    }
  }
});

const { actions, reducer } = loadingSlice;

export const { setLoading } = actions;

export default reducer;
