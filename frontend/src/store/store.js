import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import gamesReducer from '../features/games/gamesSlice';
import tagsReducer from '../features/tags/tagsSlice';


export const store = configureStore({
  middleware: [thunk],
  reducer: {
    games: gamesReducer,
    tags: tagsReducer
  },
});
