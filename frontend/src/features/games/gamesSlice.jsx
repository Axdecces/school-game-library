import { createSlice } from '@reduxjs/toolkit'

export const gamesSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {
    add: (state, action) => {
        state.push(action.payload)
    },
    remove: (state, action) => {
        state = state.filter(e => e.id !== action.payload)
    },
    update: (state, action) => {
        state.forEach(game => {
            if (game.id === action.payload.id) {
                if (action.payload.title) {
                    game.title = action.payload.title
                }
                if (action.payload.description) {
                    game.description = action.payload.description
                }
                if (action.payload.release_date) {
                    game.release_date = action.payload.release_date
                }
                if (action.payload.is_favorite) {
                    game.is_favorite = action.payload.is_favorite
                }
                if (action.payload.preview) {
                    game.preview = action.payload.preview
                }
                if (action.payload.tags) {
                    game.tags = action.payload.tags
                }
                if (action.payload.is_deleted) {
                    game.is_deleted = action.payload.is_deleted
                }
            }
        })
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, update } = gamesSlice.actions

export default gamesSlice.reducer