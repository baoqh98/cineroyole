import { Badge, Card, Grid, Group, Image, Loader, Text } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, theaterShowtimesSelector } from '../../../../app/store';
import { getTheaterShowtimes } from '../../slice/theater/theaterShowtimeSlice';

type Props = {
  theaterCluster: string;
  theaterId: string;
};

const TheaterShowtime = ({ theaterCluster, theaterId }: Props) => {
  const navigate = useNavigate();
  const { theaterShowtimes, isLoading } = useSelector(theaterShowtimesSelector);
  const dispatch = useDispatch<AppDispatch>();

  const theater = theaterShowtimes[0]?.lstCumRap.find(
    (item) => item.maCumRap === theaterId
  );
  const movieList = theater?.danhSachPhim;

  const navigateHandler = (showtimeId: string) => {
    navigate(`/purchase/${showtimeId}`);
  };

  useEffect(() => {
    dispatch(getTheaterShowtimes(theaterCluster));
  }, [theaterCluster]);

  return (
    <>
      {isLoading && <Loader size={100} variant='dots' />}

      {!isLoading && movieList && (
        <Grid
          gutter={24}
          sx={(theme) => ({
            height: theme.breakpoints.xs ? 640 : 320,
            overflowY: 'overlay',
          })}
        >
          {movieList?.map((item) => {
            return (
              <Grid.Col key={item.maPhim.toString()} md={4} sm={6}>
                <Group
                  sx={{
                    alignItems: 'flex-start',
                  }}
                >
                  <Card withBorder sx={{ width: '30%' }}>
                    <Card.Section>
                      <Image height={160} src={item.hinhAnh} />
                    </Card.Section>
                  </Card>
                  <Group
                    sx={{
                      maxWidth: '50%',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <Text
                      sx={{
                        display: 'block',
                        textAlign: 'left',
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      {item.tenPhim}
                    </Text>
                    <Group>
                      {item.dangChieu && (
                        <Badge color='indigo' variant='outline'>
                          Showing
                        </Badge>
                      )}
                      {item.hot && (
                        <Badge color='red' variant='outline'>
                          Hot
                        </Badge>
                      )}
                    </Group>
                    <Group
                      sx={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '4px',
                      }}
                    >
                      {item.lstLichChieuTheoPhim?.slice(-3).map((item) => {
                        return (
                          <Badge
                            onClick={() =>
                              navigateHandler(item.maLichChieu.toString())
                            }
                            variant='gradient'
                            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                            key={item.maLichChieu}
                            size='lg'
                            radius='md'
                            sx={{
                              cursor: 'pointer',
                              transition: 'all ease 0.1s',
                              '&:hover': {
                                transform: 'scale(105%)',
                              },
                            }}
                          >
                            {new Date(item.ngayChieuGioChieu).toLocaleString()}
                          </Badge>
                        );
                      })}
                    </Group>
                  </Group>
                </Group>
              </Grid.Col>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default TheaterShowtime;
