import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUser } from './../../../app/interface/auth/authLogin';
import cineAPI from '../../../app/apis/cineAPI';

interface AuthState {
  isLoading: boolean;
  accessToken: string;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  accessToken:
    JSON.parse(localStorage.getItem('Ciner') || 'null')?.accessToken || '',
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (values: LoginUser, { rejectWithValue }) => {
    try {
      const { authAPI } = cineAPI;
      const data = await authAPI.login(values);
      localStorage.setItem('Ciner', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const logOutHandler = (state: AuthState) => {
  localStorage.removeItem('Ciner');
  return {
    ...state,
    ...initialState,
    accessToken: '',
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: logOutHandler,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.accessToken;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
