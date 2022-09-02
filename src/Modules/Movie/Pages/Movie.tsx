import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, theaterMovieShowtimeSelector } from '../../../app/store';

import Showtime from '../Components/Showtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  BackgroundImage,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  Space,
  Text,
} from '@mantine/core';
import { getTheaterMovieShowtime } from '../slice/theaterMovieShowtimeSlice';
import { useScrollIntoView } from '@mantine/hooks';

const Movie = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { movieId } = useParams();
  const { theaterMovieShowtime: movieDetail, isLoading } = useSelector(
    theaterMovieShowtimeSelector
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTheaterMovieShowtime(movieId));
  }, [movieId]);

  return (
    <>
      <Modal
        sx={(theme) => ({
          backgroundColor: 'transparent',
          color: 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
        transitionDuration={100}
        onClose={() => setIsModalOpen(false)}
        opened={isModalOpen}
        fullScreen
        centered
        closeOnEscape
      >
        <iframe
          style={{
            marginTop: '56px',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '90%',
          }}
          src={movieDetail?.trailer}
          title={movieDetail?.biDanh}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </Modal>
      {!isLoading && (
        <BackgroundImage
          sx={(theme) => ({
            backdropFilter: 'blur(4px)',
            position: 'relative',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '100vh',
          })}
          src={movieDetail?.hinhAnh || ''}
        >
          <Box
            sx={(theme) => ({
              position: 'absolute',
              backdropFilter: 'blur(4px) brightness(0.15)',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -10,
            })}
          />
          <Container size={1200}>
            <Space h={40} />
            <Grid gutter={24}>
              <Grid.Col sm={6}>
                <Box
                  sx={(theme) => ({
                    border: `0.5px solid ${theme.colors.gray[5]}`,
                    borderRadius: '16px',
                    width: '80%',
                    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
                      width: '100%',
                    },
                  })}
                >
                  <Image fit='contain' src={movieDetail?.hinhAnh} radius='lg' />
                </Box>
              </Grid.Col>
              <Grid.Col sm={6}>
                <Group
                  sx={(theme) => ({
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '8px',
                  })}
                >
                  <Group>
                    {movieDetail?.dangChieu ? (
                      <Badge size='xl' radius='md' variant='filled'>
                        Đang chiếu
                      </Badge>
                    ) : movieDetail?.sapChieu ? (
                      <Badge size='xl' radius='md' variant='light'>
                        Sắp chiếu
                      </Badge>
                    ) : null}

                    {movieDetail?.hot && (
                      <Badge size='xl' radius='md' color='red' variant='light'>
                        Hot
                      </Badge>
                    )}
                    <Badge
                      size='xl'
                      radius='md'
                      variant='outline'
                      color='yellow'
                    >
                      <Group>
                        <FontAwesomeIcon icon={faStar} />
                        <Text>{movieDetail?.danhGia}</Text>
                      </Group>
                    </Badge>
                  </Group>
                  <Group>
                    <Text
                      sx={(theme) => ({
                        fontSize: 48,
                        fontWeight: 700,
                        textAlign: 'left',
                      })}
                    >
                      {movieDetail?.tenPhim}
                    </Text>
                    <Text
                      sx={(theme) => ({
                        fontSize: 16,
                        fontWeight: 300,
                        textAlign: 'left',
                      })}
                    >
                      {movieDetail?.moTa}
                    </Text>
                  </Group>
                  <Group
                    sx={(theme) => ({
                      marginTop: '24px',
                      width: '100%',

                      [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                        justifyContent: 'center',
                      },
                    })}
                  >
                    <Button
                      sx={{
                        minWidth: '40%',
                      }}
                      radius='xl'
                      size='lg'
                      variant='light'
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Text size={18} mr={8}>
                        Trailer
                      </Text>
                      <FontAwesomeIcon icon={faPlay} />
                    </Button>
                    <Button
                      sx={{
                        minWidth: '40%',
                      }}
                      radius='xl'
                      size='lg'
                      onClick={() => scrollIntoView()}
                    >
                      <Text size={18} mr={8}>
                        Đặt vé
                      </Text>
                    </Button>
                  </Group>
                </Group>
              </Grid.Col>
            </Grid>
          </Container>
          <Space h={48} />
          {movieDetail && (
            <Showtime theaterSystem={movieDetail?.heThongRapChieu || []} />
          )}
          <Space ref={targetRef} h={80} />
        </BackgroundImage>
      )}
    </>
  );
};

export default Movie;
