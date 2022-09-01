import { useReducer, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, selectedTicketsSelector } from '../../../../app/store';
import {
  removeAllTicketsAction,
  selectTicketAction,
} from '../../slice/selectedTicketSlice';
import { bookTickets, getTickets } from '../../slice/ticketsSlice';

import { useNavigate } from 'react-router-dom';
import { DanhSachGheElement } from '../../../../app/interface/ticket/ticket';
import { ThongTinPhim } from '../../../../app/interface/ticket/ticket';

import {
  Box,
  Button,
  Group,
  MantineTheme,
  Modal,
  Space,
  Title,
} from '@mantine/core';

interface Props {
  seats: DanhSachGheElement[];
  movieDetail: ThongTinPhim;
}

interface ModalState {
  loginModal: boolean;
  successModal: boolean;
  isSelectedSeat: boolean;
  message?: string;
}
interface ModalAction {
  type: string;
  payload?: any;
}

const initialModalState: ModalState = {
  loginModal: false,
  successModal: false,
  isSelectedSeat: false,
  message: '',
};

const modalReducer = (state: ModalState, { type, payload }: ModalAction) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, successModal: false, loginModal: true };
    case 'SUCCESS':
      return {
        ...state,
        successModal: true,
        loginModal: false,
        message: payload as string,
      };
    case 'UNSELECTED':
      return {
        ...state,
        successModal: false,
        loginModal: false,
        isSelectedSeat: true,
      };
    case 'CLOSE':
      return initialModalState;
    default:
      return state;
  }
};

const TicketSelection = ({ seats, movieDetail }: Props) => {
  // const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [modalState, dispatchModal] = useReducer(
    modalReducer,
    initialModalState
  );
  const userData = JSON.parse(localStorage.getItem('Ciner') || 'null');
  const mobileSizeM = useMediaQuery('(max-width: 375px)');
  const tabletSize = useMediaQuery('(max-width: 1024px)');
  const navigate = useNavigate();
  const { danhSachVe } = useSelector(selectedTicketsSelector);
  const dispatch = useDispatch<AppDispatch>();

  const chunkSize = mobileSizeM ? 8 : tabletSize ? 10 : 16;
  const rows = [];
  for (let i = 0; i < seats.length; i += chunkSize) {
    rows.push(seats.slice(i, i + chunkSize));
  }

  const selectTicketsHandler = (
    maGhe: number,
    giaVe: number,
    daDat: boolean
  ) => {
    if (daDat) return;
    dispatch(selectTicketAction({ maGhe, giaVe }));
  };

  const removeAllHandler = () => {
    dispatch(removeAllTicketsAction());
  };

  const closeModalHandler = () => {
    if (modalState.successModal) {
      dispatch(getTickets(movieDetail.maLichChieu.toString()));
      dispatchModal({ type: 'CLOSE' });
      removeAllHandler();
      return;
    }
    dispatchModal({ type: 'CLOSE' });
  };

  const bookTicketsHandler = () => {
    const ticket = {
      maLichChieu: movieDetail.maLichChieu,
      danhSachVe: danhSachVe,
    };

    if (danhSachVe.length === 0) {
      dispatchModal({ type: 'UNSELECTED' });
      return;
    }

    if (userData) {
      dispatch(
        bookTickets({
          selectedTicket: ticket,
          showtimeId: movieDetail.maLichChieu.toString(),
        })
      )
        .unwrap()
        .then((data) => dispatchModal({ type: 'SUCCESS', payload: data }));
    } else {
      dispatchModal({ type: 'LOGIN' });
    }
  };

  const boxSeatStyle = (
    theme: MantineTheme,
    seatId: number,
    seatType: string,
    isBooked: boolean
  ) => {
    const isSeatExist = danhSachVe.some((item) => item.maGhe === seatId);
    return {
      padding: '8px',
      borderRadius: '4px',
      fontSize: mobileSizeM ? '12px' : '16px',
      backgroundColor: isBooked
        ? theme.colors.cyan
        : isSeatExist
        ? theme.colors.green[6]
        : seatType === 'Vip'
        ? theme.colors.grape
        : theme.colors.dark[8],
      cursor: isBooked ? 'not-allowed' : 'pointer',
      '&:hover': {
        backgroundColor: isBooked
          ? theme.colors.cyan
          : isSeatExist
          ? theme.colors.green[8]
          : seatType === 'Vip'
          ? theme.colors.grape[7]
          : theme.colors.dark[6],
      },
    };
  };

  return (
    <>
      <Modal
        opened={
          modalState.loginModal ||
          modalState.isSelectedSeat ||
          modalState.successModal
        }
        onClose={() => dispatchModal({ type: 'CLOSE' })}
        centered
        withCloseButton={false}
        overlayBlur={2}
        closeOnClickOutside
      >
        <Title
          sx={(theme) => ({
            color: theme.colors.yellow,
          })}
          order={3}
        >
          {modalState.loginModal && 'Bạn chưa đăng nhập. Đăng nhập để đặt vé'}
          {modalState.isSelectedSeat && 'Bạn chưa chọn ghế'}
          {modalState.successModal && `${modalState.message}`}{' '}
        </Title>
        <Space h={24} />
        <Group position='right'>
          <Button
            onClick={closeModalHandler}
            variant='light'
            radius='sm'
            color='red'
          >
            Thoát
          </Button>
          {modalState.loginModal && (
            <Button radius='sm' onClick={() => navigate('/auth/login')}>
              Đăng nhập
            </Button>
          )}
        </Group>
      </Modal>

      {rows.map((row) => {
        return (
          <Box key={Math.random()}>
            <Group
              sx={(theme) => ({
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(16, 1fr)',
                gap: '4px',
                [`@media (max-width:  1024px)`]: {
                  gridTemplateColumns: 'repeat(10, 1fr)',
                },
                [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                  gridTemplateColumns: 'repeat(8, 1fr)',
                },
                [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                  gridTemplateColumns: 'repeat(10, 1fr)',
                },
                [`@media (max-width: 375px)`]: {
                  gridTemplateColumns: 'repeat(8, 1fr)',
                },
              })}
            >
              {row.map((item) => (
                <Box
                  onClick={() =>
                    selectTicketsHandler(item.maGhe, item.giaVe, item.daDat)
                  }
                  sx={(theme) =>
                    boxSeatStyle(theme, item.maGhe, item.loaiGhe, item.daDat)
                  }
                  key={item.maGhe}
                >
                  {item.tenGhe}
                </Box>
              ))}
            </Group>
            <Space h={6} />
          </Box>
        );
      })}

      <Space h={16} />
      <Group>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[8],
            fontWeight: 500,
            cursor: 'default',
            padding: '8px',
            borderRadius: '6px',
          })}
        >
          Ghế thường
        </Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.grape,
            fontWeight: 500,
            cursor: 'default',
            padding: '8px',
            borderRadius: '6px',
          })}
        >
          Ghế VIP
        </Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.green[6],
            fontWeight: 500,
            cursor: 'default',
            padding: '8px',
            borderRadius: '6px',
          })}
        >
          Đã chọn
        </Box>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.cyan,
            fontWeight: 500,
            cursor: 'default',
            padding: '8px',
            borderRadius: '6px',
          })}
        >
          Đã đặt
        </Box>
      </Group>
      <Space h={48} />
      <Group
        sx={(theme) => ({
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            justifyContent: 'center',
          },
        })}
        position='right'
      >
        <Button
          onClick={removeAllHandler}
          radius='md'
          variant='light'
          color='red'
          size='lg'
        >
          Hủy tất cả ghế
        </Button>
        <Button radius='md' size='lg' onClick={bookTicketsHandler}>
          Đặt vé
        </Button>
      </Group>
    </>
  );
};

export default TicketSelection;
