import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gamesSlice';
import tagsReducer from '../features/tagsSlice';


export const store = configureStore({
  reducer: {
    games: gamesReducer,
    tags: tagsReducer
  },
});
