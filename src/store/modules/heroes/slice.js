import { createSlice } from '@reduxjs/toolkit';

const heroesSlice = createSlice({
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
    },
    addFavorite(state, { payload }) {
      state.favorites = [...state.favorites, payload];
    },
    removeFavorite(state, { payload }) {
      state.favorites = state.favorites.filter(fav => fav.id !== payload.id);
    }
  }
});

const { actions, reducer } = heroesSlice;

export const {
  setHeroes,
  setHeroesOffset,
  setFavorites,
  addFavorite,
  removeFavorite
} = actions;

export default reducer;
