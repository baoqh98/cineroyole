import { Theater } from './../../../../app/interface/theater/theater';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cineAPI from '../../../../app/apis/cineAPI';

interface TheaterState {
  theaters: Theater[];
  isLoading: boolean;
  error?: string;
}

const initialState: TheaterState = {
  theaters: [],
  isLoading: false,
  error: '',
};

export const getTheaters = createAsyncThunk(
  'home/theaters/getTheaters',
  async (params: string, { rejectWithValue }) => {
    try {
      const { theaterAPI } = cineAPI;
      const data = await theaterAPI.getTheaters(params);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const theatersSlice = createSlice({
  name: 'home/theaters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTheaters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTheaters.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.theaters = payload;
    });
    builder.addCase(getTheaters.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.isLoading = false;
    });
  },
});

export default theatersSlice.reducer;
