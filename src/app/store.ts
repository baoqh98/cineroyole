import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bannerReducer from '../Modules/Home/slice/bannerSlice';
import movieReducer from '../Modules/Home/slice/movieSlice';
import theaterBrandsReducer from '../Modules/Home/slice/theater/theaterBrandsSlice';
import theatersReducer from '../Modules/Home/slice/theater/theatersSlice';
import theaterShowtimeReducer from '../Modules/Home/slice/theater/theaterShowtimeSlice';
import theaterMovieShowtimeReducer from '../Modules/Movie/slice/theaterMovieShowtimeSlice';
import ticketsReducer from '../Modules/Purchase/slice/ticketsSlice';
import selectedTicketReducer from '../Modules/Purchase/slice/selectedTicketSlice';
import authReducer from '../Modules/Authentication/slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    banner: bannerReducer,
    movie: movieReducer,
    theaterBrands: theaterBrandsReducer,
    theaters: theatersReducer,
    theaterShowtimes: theaterShowtimeReducer,
    theaterMovieShowtime: theaterMovieShowtimeReducer,
    tickets: ticketsReducer,
    selectedTickets: selectedTicketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const authSelector = (state: RootState) => state.auth;
export const bannerSelector = (state: RootState) => state.banner;
export const movieSelector = (state: RootState) => state.movie;
export const theaterBrandsSelector = (state: RootState) => state.theaterBrands;
export const theatersSelector = (state: RootState) => state.theaters;
export const theaterShowtimesSelector = (state: RootState) =>
  state.theaterShowtimes;
export const theaterMovieShowtimeSelector = (state: RootState) =>
  state.theaterMovieShowtime;
export const ticketsSelector = (state: RootState) => state.tickets;
export const selectedTicketsSelector = (state: RootState) =>
  state.selectedTickets;
