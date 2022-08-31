export interface DanhSachVe {
  maGhe: number;
  giaVe: number;
}

export interface SelectedTickets {
  maLichChieu: number;
  danhSachVe: DanhSachVe[];
}

export interface TicketBooking {
  selectedTicket: SelectedTickets;
  showtimeId: string;
  accessToken: string;
}
