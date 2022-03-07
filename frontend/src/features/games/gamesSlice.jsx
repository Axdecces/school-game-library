import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchGamesList = createAsyncThunk(
    "games/fetchAll",
    () => axios
        .get('http://localhost:8000/api/games/')
        .then(res => res.data)
        .catch(err => err)
);

export const createGame = createAsyncThunk(
    "games/add",
    data  => axios
            .post('http://localhost:8000/api/games/', data)
            .then(res => res.data)
            .catch(err => console.log(err))
);

export const uploadImage = createAsyncThunk(
    "games/setImage",
    data => {
        const formData = new FormData()
        formData.append('image', data.image);
        return axios
            .post(`http://localhost:8000/api/games/${data.id}/set-image/`, formData)
            .then(res => res.data)
            .catch(err => console.log(err))
    }
);

export const deleteGame = createAsyncThunk(
    "games/delete",
    gameId  => axios
        .delete(`http://localhost:8000/api/games/${gameId}/`)
        .then(res => gameId)
        .catch(err => err) 
);

export const updateGame = createAsyncThunk(
    "games/update",
    updates => axios
        .patch(`http://localhost:8000/api/games/${updates.id}/`, updates)
        .then(res => res.data)
        .catch(err => err)
);

export const gamesSlice = createSlice({
  name: 'games',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchGamesList.fulfilled]: (state, action) => action.payload,
    [createGame.fulfilled]: (state, action) => [...state, action.payload],
    [deleteGame.fulfilled]: (state, action) => state.filter(game => game.id !== action.payload),
    [updateGame.fulfilled]: (state, action) => [...state.filter(game => game.id !== action.payload.id), action.payload],
    [uploadImage.fulfilled]: (state, action) => [...state.filter(game => game.id !== action.payload.id), action.payload],
  },
})

export default gamesSlice.reducer

export const selectAllGames = state => state.games

export const selectGameById = (state, gameId) =>
  state.games.find(game => game.id === gameId)