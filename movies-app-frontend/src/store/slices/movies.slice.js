import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { genericRequestThunk } from './app.slice';

export const moviesSlice = createSlice({
    name: 'movie',
    initialState: [],
    reducers: {
        setMovie: (_, action) => action.payload,
        addMovie: (state, { payload }) => { state.push(payload) },
        deleteMovie: (state, { payload }) =>
            state.filter(movie => movie.id !== payload),
        updateMovie: (state, { payload: { id, movie } }) => {
            const index = state.findIndex(movie => movie.id === id);
            console.log(movie);
            state[index] = movie;
        }
    }
})

export const getMoviesThunk = () => (dispatch) => {
    dispatch(genericRequestThunk(async () => {
        const res = await axios.get('/movies')
        dispatch(setMovie(res.data));
    }));
}

export const addMovieThunk = movie => dispatch => {
  return dispatch(genericRequestThunk(async () => {
    // 1. Crear la película con sus campos propios
    const { data } = await axios.post('/movies', {
      name: movie.name,
      image: movie.image,
      synopsis: movie.synopsis,
      release_year: movie.release_year
    });

    // 2. Usar directamente los arrays de IDs
    const { data: genres } = await axios.post(`/movies/${data.id}/genres`, movie.genres);
    const { data: directors } = await axios.post(`/movies/${data.id}/directors`, movie.directors);
    const { data: actors } = await axios.post(`/movies/${data.id}/actors`, movie.actors);

    // 3. Actualizar Redux con película + relaciones
    dispatch(addMovie({ ...data, genres, directors, actors }));
  }, "Movie added successfully"));
};

export const deleteMovieThunk = id => dispatch => {
    dispatch(genericRequestThunk(async () => {
        await axios.delete(`/movies/${id}`)
        dispatch(deleteMovie(id));
    }, "Movie deleted successfully"))
}

export const updateMovieThunk = (id, movie) => dispatch => {
  return dispatch(genericRequestThunk(async () => {
    // 1. Filtrar solo los campos propios de la película
    const moviePayload = {
      name: movie.name,
      image: movie.image,
      synopsis: movie.synopsis,
      release_year: movie.release_year
    };

    // 2. Actualizar la película
    const { data: movieRes } = await axios.put(`/movies/${id}`, moviePayload);

    // 3. Usar directamente los arrays de IDs
    const { data: genres } = await axios.post(`/movies/${id}/genres`, movie.genres);
    const { data: directors } = await axios.post(`/movies/${id}/directors`, movie.directors);
    const { data: actors } = await axios.post(`/movies/${id}/actors`, movie.actors);

    // 4. Actualizar Redux con toda la info
    dispatch(updateMovie({
      id,
      movie: { ...movieRes, genres, directors, actors }
    }));
  }, "Movie updated successfully"));
};

export const { setMovie, addMovie, deleteMovie, updateMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
