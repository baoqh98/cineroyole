import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cineAPI from '../../../../app/apis/cineAPI';
import { TheaterShowtime } from '../../../../app/interface/theater/theaterShowtime';

interface TheaterShowtimeState {
  theaterShowtimes: TheaterShowtime[];
  isLoading: boolean;
  error?: string;
}

const initialState: TheaterShowtimeState = {
  theaterShowtimes: [],
  isLoading: false,
  error: '',
};

export const getTheaterShowtimes = createAsyncThunk(
  'home/theaterShowtime/getTheaterShowtimes',
  async (theaterValue: string, { rejectWithValue }) => {
    try {
      const { theaterAPI } = cineAPI;
      const data = await theaterAPI.getTheaterShowtimes(theaterValue);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const theaterShowtimeSlice = createSlice({
  name: 'home/theaterShowtime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTheaterShowtimes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTheaterShowtimes.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.theaterShowtimes = payload;
    });
    builder.addCase(getTheaterShowtimes.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.isLoading = false;
    });
  },
});

export default theaterShowtimeSlice.reducer;
