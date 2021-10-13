import { createSlice } from '@reduxjs/toolkit'

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: [],
  reducers: {
    add: (state, action) => {
        state.push(action.payload)
    },
    remove: (state, action) => {
        state = state.filter(e => e.id !== action.payload)
    },
    update: (state, action) => {
        console.log(action);
        state.forEach(tag => {
            if (tag.id === action.payload.id) {
                if (action.payload.title) {
                    tag.title = action.payload.title
                }
            }
        })
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, update } = tagsSlice.actions

export default tagsSlice.reducer

export const selectAllTags = state => state.tags
