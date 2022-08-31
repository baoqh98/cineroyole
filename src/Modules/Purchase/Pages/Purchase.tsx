import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useMediaQuery } from '@mantine/hooks';
import {
  Container,
  Grid,
  Space,
  Button,
  Group,
  Box,
  Modal,
  Title,
  Loader,
} from '@mantine/core';
import TicketSelection from '../Components/TicketSelection';
import TicketsDetail from '../Components/TicketsDetail';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, ticketsSelector } from '../../../app/store';
import { getTickets } from '../slice/ticketsSlice';
import { ThongTinPhim } from '../../../app/interface/ticket/ticket';

const Purchase = () => {
  const [openedModal, setOpenedModal] = useState(false);
  const mobileSize = useMediaQuery('(max-width: 576px)');
  const { tickets, isLoading } = useSelector(ticketsSelector);

  const dispatch = useDispatch<AppDispatch>();
  const { showtimeId } = useParams();

  const { danhSachGhe: seats, thongTinPhim: movieDetail } = tickets || {
    danhSachGhe: [],
    thongTinPhim: {},
  };

  useEffect(() => {
    dispatch(getTickets(showtimeId as string));
  }, [showtimeId]);

  return (
    <>
      {isLoading && (
        <>
          <Space h={240} />
          <Loader size={50} />
        </>
      )}
      {!isLoading && (
        <Container size={1200}>
          <Space h={48} />
          <Title order={1}>Let book your ticket</Title>
          <>
            <Space h={48} />
            <Grid gutter='xl'>
              <Grid.Col sm={8} xs={12} span={mobileSize ? 12 : undefined}>
                <TicketSelection
                  movieDetail={movieDetail as ThongTinPhim}
                  seats={seats}
                />
              </Grid.Col>
              {!mobileSize && (
                <Grid.Col sm={4} xs={12} span={mobileSize ? 12 : undefined}>
                  <TicketsDetail
                    movieDetail={movieDetail as ThongTinPhim}
                    seats={seats}
                  />
                </Grid.Col>
              )}
              <Modal
                opened={openedModal}
                onClose={() => setOpenedModal(false)}
                color='red'
                transition='rotate-left'
                centered
              >
                <TicketsDetail
                  movieDetail={movieDetail as ThongTinPhim}
                  seats={seats}
                />
              </Modal>
            </Grid>
          </>
          {mobileSize && (
            <Box
              sx={{
                height: 80,
              }}
            />
          )}
        </Container>
      )}

      {mobileSize && (
        <Group
          sx={(theme) => ({
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
          })}
        >
          <Button
            onClick={() => setOpenedModal(true)}
            size='xl'
            variant='light'
            fullWidth
          >
            Xem vé
          </Button>
        </Group>
      )}
    </>
  );
};

export default Purchase;
