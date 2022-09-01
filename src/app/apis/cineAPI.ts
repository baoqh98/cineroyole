import axiosClient from './axiosClient';
import { DanhSachGhe } from './../interface/ticket/ticket';
import { TheaterShowtime } from './../interface/theater/theaterShowtime';
import { TheaterBrand } from './../interface/theater/theaterBrand';
import { Theater } from '../interface/theater/theater';
import { Banner } from '../interface/banner/banner';
import { Movie } from '../interface/movie/movie';
import { TheaterMovieShowtime } from '../interface/theater/theaterMovieShowtime';
import {
  SelectedTickets,
  TicketBooking,
} from '../interface/ticket/selectedTicket';
import { LoginUser, UserData } from '../interface/auth/authLogin';
import { RegisterUser } from '../interface/auth/authRegister';
import { AxiosRequestConfig } from 'axios';

const authAPI = {
  login: (values: LoginUser) => {
    return axiosClient.post<unknown, UserData>(
      'QuanLyNguoiDung/DangNhap',
      values
    );
  },
  register: (values: RegisterUser) => {
    return axiosClient.post('QuanLyNguoiDung/DangKy', {
      ...values,
      maNhom: 'GP13',
    });
  },
};

const theaterAPI = {
  getTheaterBrands: () => {
    return axiosClient.get<unknown, TheaterBrand[]>(
      'QuanLyRap/LayThongTinHeThongRap',
      {
        params: {
          maNhom: 'GP13',
        },
      }
    );
  },

  getTheaters: (theaterValue: string) => {
    return axiosClient.get<unknown, Theater[]>(
      `QuanLyRap/LayThongTinCumRapTheoHeThong`,
      {
        params: {
          maHeThongRap: theaterValue,
        },
      }
    );
  },

  getTheaterShowtimes: (theaterShowtimeValue: string) => {
    return axiosClient.get<unknown, TheaterShowtime[]>(
      `QuanLyRap/LayThongTinLichChieuHeThongRap`,
      {
        params: {
          maHeThongRap: theaterShowtimeValue,
        },
      }
    );
  },

  getMovieShowtime: (movieId: string | undefined) => {
    return axiosClient.get<unknown, TheaterMovieShowtime>(
      'QuanLyRap/LayThongTinLichChieuPhim',
      {
        params: {
          MaPhim: movieId,
        },
      }
    );
  },
};

const bannerAPI = {
  getBanners: () => {
    return axiosClient.get<unknown, Banner[]>('QuanLyPhim/LayDanhSachBanner', {
      params: {
        maNhom: 'GP13',
      },
    });
  },
};

const movieAPI = {
  getMovies: () => {
    return axiosClient.get<unknown, Movie[]>('QuanLyPhim/LayDanhSachPhim', {
      params: {
        maNhom: 'GP13',
      },
    });
  },
};

const ticketAPI = {
  getTickets: (showtimeId: string) => {
    return axiosClient.get<unknown, DanhSachGhe>(
      'QuanLyDatVe/LayDanhSachPhongVe',
      {
        params: {
          MaLichChieu: showtimeId,
        },
      }
    );
  },
  bookTickets: ({ selectedTicket }: TicketBooking) => {
    return axiosClient.post<unknown, TicketBooking>('QuanLyDatVe/DatVe', {
      ...selectedTicket,
    });
  },
};

const cineAPI = {
  bannerAPI,
  movieAPI,
  theaterAPI,
  ticketAPI,
  authAPI,
};

export default cineAPI;
