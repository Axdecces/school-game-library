import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gameSlice';
import tagsReducer from '../features/tags/tagSlice';


export const store = configureStore({
  reducer: {
    games: gamesReducer,
    tags: tagsReducer
  },
});
