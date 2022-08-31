import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cineAPI from '../../../app/apis/cineAPI';
import { Banner } from '../../../app/interface/banner/banner';

interface BannerState {
  banners: Banner[];
  isLoading: boolean;
  error?: string;
}

const initialState: BannerState = {
  banners: [],
  isLoading: false,
  error: '',
};

export const getBanners = createAsyncThunk(
  'home/banner/getBanners',
  async (_, { rejectWithValue }) => {
    try {
      const { bannerAPI } = cineAPI;
      const data = await bannerAPI.getBanners();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bannerSlice = createSlice({
  name: 'home/banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBanners.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.banners = payload;
    });
    builder.addCase(getBanners.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.isLoading = false;
    });
  },
});

export default bannerSlice.reducer;
