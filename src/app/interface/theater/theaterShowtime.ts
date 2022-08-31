enum TenRap {
  Rạp1 = 'Rạp 1',
  Rạp10 = 'Rạp 10',
  Rạp2 = 'Rạp 2',
  Rạp3 = 'Rạp 3',
  Rạp4 = 'Rạp 4',
  Rạp5 = 'Rạp 5',
  Rạp6 = 'Rạp 6',
  Rạp7 = 'Rạp 7',
  Rạp8 = 'Rạp 8',
  Rạp9 = 'Rạp 9',
}

interface LstLichChieuTheoPhim {
  maLichChieu: number;
  maRap: string;
  tenRap: TenRap;
  ngayChieuGioChieu: Date;
  giaVe: number;
}

interface DanhSachPhim {
  lstLichChieuTheoPhim: LstLichChieuTheoPhim[];
  maPhim: number;
  tenPhim: string;
  hinhAnh: string;
  hot: boolean | null;
  dangChieu: boolean | null;
  sapChieu: boolean | null;
}

interface LstCumRap {
  danhSachPhim: DanhSachPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

export interface TheaterShowtime {
  lstCumRap: LstCumRap[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
  mahom: string;
}
