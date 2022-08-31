import { DanhSachVe } from './../../../app/interface/ticket/selectedTicket';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedTickets } from '../../../app/interface/ticket/selectedTicket';

const initialState: SelectedTickets = {
  maLichChieu: 0,
  danhSachVe: [],
};

const removeAllTicketHandler = (state: SelectedTickets) => {
  state.danhSachVe.length = 0;
};

const selectTicketHandler = (
  state: SelectedTickets,
  { payload }: PayloadAction<DanhSachVe>
) => {
  const { maGhe, giaVe } = payload;
  const isSeatExist = state.danhSachVe.some((item) => item.maGhe === maGhe);

  if (!isSeatExist) {
    const updatedDanhSachVe = state.danhSachVe.concat(payload);
    return {
      ...state,
      danhSachVe: updatedDanhSachVe,
    };
  }

  if (isSeatExist) {
    const updatedDanhSachVe = state.danhSachVe.filter(
      (item) => item.maGhe !== maGhe
    );
    return {
      ...state,
      danhSachVe: updatedDanhSachVe,
    };
  }
};

const selectedTicketsSlice = createSlice({
  name: 'purchase/selectedTickets',
  initialState,
  reducers: {
    selectTicketAction: selectTicketHandler,
    removeAllTicketsAction: removeAllTicketHandler,
  },
});

export const { selectTicketAction, removeAllTicketsAction } =
  selectedTicketsSlice.actions;
export default selectedTicketsSlice.reducer;
