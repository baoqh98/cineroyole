import { Movie } from '../../../app/interface/movie/movie';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cineAPI from '../../../app/apis/cineAPI';

interface MovieState {
  movies: Movie[];
  isLoading: boolean;
  error?: string;
}

const initialState: MovieState = {
  movies: [],
  isLoading: false,
  error: '',
};

export const getMovies = createAsyncThunk(
  'home/movie/getMovies',
  async (_, { rejectWithValue }) => {
    try {
      const { movieAPI } = cineAPI;
      const data = await movieAPI.getMovies();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const movieSlice = createSlice({
  name: 'home/movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movies = payload;
    });
    builder.addCase(getMovies.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.isLoading = false;
    });
  },
});

export default movieSlice.reducer;
