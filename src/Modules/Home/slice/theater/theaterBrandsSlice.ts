import { TheaterBrand } from '../../../../app/interface/theater/theaterBrand';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cineAPI from '../../../../app/apis/cineAPI';

interface TheaterState {
  theaterBrands: TheaterBrand[];
  isLoading: boolean;
  error?: string;
}

const initialState: TheaterState = {
  theaterBrands: [],
  isLoading: false,
  error: '',
};

export const getTheaterBrands = createAsyncThunk(
  'home/theater/getTheaterBrands',
  async (_, { rejectWithValue }) => {
    try {
      const { theaterAPI } = cineAPI;
      const data = await theaterAPI.getTheaterBrands();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const theaterBrandsSlice = createSlice({
  name: 'home/theaterBrands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTheaterBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTheaterBrands.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.theaterBrands = payload;
      })
      .addCase(getTheaterBrands.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isLoading = false;
      });
  },
});

export default theaterBrandsSlice.reducer;
