import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const gamesSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {
    add: (state, action) => {
        state.push(action.payload);
    },
    remove: (state, action) => {
        state = state.filter(e => e.id !== action.payload)
    },
    update: (state, action) => {
        state.forEach(game => {
            if (game.id === action.payload.id) {
                if (action.payload.title != null) {
                    game.title = action.payload.title;
                }
                if (action.payload.description != null) {
                    game.description = action.payload.description;
                }
                if (action.payload.release_date != null) {
                    game.release_date = action.payload.release_date;
                }
                if (action.payload.rating != null) {
                    game.rating = action.payload.rating;
                }
                if (action.payload.isFavorite != null) {
                    game.is_favorite = action.payload.isFavorite;
                }
                if (action.payload.preview != null) {
                    game.preview = action.payload.preview;
                }
                if (action.payload.tags != null) {
                    game.tags = action.payload.tags;
                }
                if (action.payload.is_deleted != null) {
                    game.is_deleted = action.payload.isDeleted;
                }
            }
        })
    },
    write: (state, action) => {
        axios.post();
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, update, save } = gamesSlice.actions

export default gamesSlice.reducer

export const selectAllGames = state => state.games

export const selectGameById = (state, gameId) =>
  state.games.find(game => game.id === gameId)