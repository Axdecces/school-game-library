import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchTagsList = createAsyncThunk(
    "tags/fetchAll",
    () => axios
        .get('http://localhost:8000/api/tags/')
        .then(res => res.data)
        .catch(err => err)
);

export const createTag = createAsyncThunk(
    "tags/add",
    data  => axios
        .post('http://localhost:8000/api/tags/', data)
        .then(res => res.data)
        .catch(err => err)
);

export const deleteTag = createAsyncThunk(
    "tags/delete",
    tagId  => axios
        .delete(`http://localhost:8000/api/tags/${tagId}/`)
        .then(res => tagId)
        .catch(err => err) 
);

export const updateTag = createAsyncThunk(
    "tags/update",
    updates => axios
        .patch(`http://localhost:8000/api/tags/${updates.id}/`, updates)
        .then(res => res.data)
        .catch(err => err)
);

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchTagsList.fulfilled]: (state, action) => action.payload,
    [createTag.fulfilled]: (state, action) => {
        state.push(action.payload)
    },
    [deleteTag.fulfilled]: (state, action) => state.filter(tag => tag.id !== action.payload),
    [updateTag.fulfilled]: (state, action) => {
        state.forEach(tag => {
            if (tag.id === action.payload.id) {
                tag.title = action.payload.title
            }
        });
    }
  },
})

export default tagsSlice.reducer

export const selectAllTags = state => state.tags
