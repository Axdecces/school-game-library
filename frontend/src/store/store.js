import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gamesSlice';
import deletedGamesReducer from '../features/games/deletedGamesSlice';
import tagsReducer from '../features/tagsSlice';


export const store = configureStore({
  reducer: {
    games: gamesReducer,
    deletedGames: deletedGamesReducer,
    tags: tagsReducer
  },
});
