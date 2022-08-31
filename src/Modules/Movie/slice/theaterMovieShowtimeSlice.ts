import { TheaterMovieShowtime } from '../../../app/interface/theater/theaterMovieShowtime';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cineAPI from '../../../app/apis/cineAPI';

interface TheaterMovieShowtimeState {
  theaterMovieShowtime: TheaterMovieShowtime | null;
  isLoading: boolean;
  error?: string;
}

const initialState: TheaterMovieShowtimeState = {
  theaterMovieShowtime: null,
  isLoading: false,
  error: '',
};

export const getTheaterMovieShowtime = createAsyncThunk(
  'movie/movieShowtime/getMovieShowtime',
  async (movieId: string | undefined, { rejectWithValue }) => {
    try {
      const { theaterAPI } = cineAPI;
      const data = await theaterAPI.getMovieShowtime(movieId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const theaterMovieShowtimeSlice = createSlice({
  name: 'movie/movieShowtime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTheaterMovieShowtime.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTheaterMovieShowtime.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.theaterMovieShowtime = payload;
    });
    builder.addCase(getTheaterMovieShowtime.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.isLoading = false;
    });
  },
});

export default theaterMovieShowtimeSlice.reducer;
