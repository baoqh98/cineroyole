interface DanhSachRap {
  maRap: number;
  tenRap: string;
}

export interface Theater {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap?: DanhSachRap[];
}
