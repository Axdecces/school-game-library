import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import gamesReducer from '../features/games/gamesSlice';
import tagsReducer from '../features/tags/tagsSlice';
import headerReducer from '../features/header/headerSlice';


export const store = configureStore({
  middleware: [thunk],
  reducer: {
    games: gamesReducer,
    tags: tagsReducer,
    header: headerReducer,
  },
});
