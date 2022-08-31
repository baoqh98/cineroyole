export interface ThongTinPhim {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
}

enum LoaiGhe {
  Thuong = 'Thuong',
  Vip = 'Vip',
}

export interface DanhSachGheElement {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: LoaiGhe;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: null;
}

export interface DanhSachGhe {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGheElement[];
}
