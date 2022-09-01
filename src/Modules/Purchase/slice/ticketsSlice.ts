import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import cineAPI from '../../../app/apis/cineAPI';
import { TicketBooking } from '../../../app/interface/ticket/selectedTicket';
import { DanhSachGhe } from '../../../app/interface/ticket/ticket';

interface TicketsState {
  tickets: DanhSachGhe | null;
  isLoading: boolean;
  error?: string;
}

const initialState: TicketsState = {
  tickets: null,
  isLoading: false,
  error: '',
};

export const getTickets = createAsyncThunk(
  'purchase/tickets/getTickets',
  async (showtimeId: string, { rejectWithValue }) => {
    try {
      const { ticketAPI } = cineAPI;
      const data = ticketAPI.getTickets(showtimeId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const bookTickets = createAsyncThunk(
  'purchase/tickets/bookTickets',
  async (
    { selectedTicket, showtimeId }: TicketBooking,
    { rejectWithValue }
  ) => {
    try {
      const { ticketAPI } = cineAPI;
      const data = await ticketAPI.bookTickets({
        selectedTicket,
        showtimeId,
      });
      // dispatch(getTickets(showtimeId));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ticketsSlice = createSlice({
  name: 'purchase/tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tickets = payload;
      })
      .addCase(getTickets.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.isLoading = false;
      });
  },
});

export default ticketsSlice.reducer;
