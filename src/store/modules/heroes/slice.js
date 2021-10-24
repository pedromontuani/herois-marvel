import { createSlice } from '@reduxjs/toolkit';

const favSlice = createSlice({
  name: 'heroes',
  initialState: {
    allHeroes: [],
    favorites: []
  },
  reducers: {
    setHeroes(state, { payload }) {
      state.allHeroes = payload;
    },
    setHeroesOffset(state, { payload }) {
      state.allHeroes = [...state.allHeroes, ...payload];
    },
    setFavorites(state, { payload }) {
      state.favorites = payload;
    }
  }
});

const { actions, reducer } = favSlice;

export const { setHeroes, setHeroesOffset, setFavorites } = actions;

export default reducer;
