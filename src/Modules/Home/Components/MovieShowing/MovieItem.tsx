import { Card, Image, Group, Text, Badge, Button, Box } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../../../../app/interface/movie/movie';

interface Props {
  movie: Movie;
}

const MovieItem = ({ movie }: Props) => {
  const navigate = useNavigate();
  const { hinhAnh, moTa, hot, tenPhim, maPhim: movieId } = movie;

  const navigateHandler = (movieId: number) => {
    navigate(`movie/${movieId}`);
  };

  return (
    <Box
      onClick={() => navigateHandler(movieId)}
      sx={(theme) => ({
        transition: 'all ease 0.2s',
        zIndex: 100,
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(110%)',
        },

        [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
          '&:hover': {
            transform: 'unset',
          },
        },
      })}
    >
      <Card
        sx={(theme) => ({
          height: 280,
        })}
        radius='md'
        withBorder
      >
        <Card.Section>
          <Image src={hinhAnh} height='100%' fit='contain' withPlaceholder />
        </Card.Section>
      </Card>
      <Group
        sx={(theme) => ({
          padding: '0 8px',
          marginTop: 16,
        })}
      >
        <Group
          position='apart'
          sx={(theme) => ({
            width: '100%',
            alignItems: 'flex-start',
          })}
        >
          <Text
            sx={{
              width: '70%',
              textAlign: 'left',
              height: 40,
              lineHeight: '20px',
              fontSize: 18,
              fontWeight: 500,
              margin: 0,
            }}
            lineClamp={2}
          >
            {tenPhim}
          </Text>
          {hot && (
            <Badge color='pink' variant='light'>
              Hot
            </Badge>
          )}
        </Group>
        <Text align='left' size='sm' color='gray0' lineClamp={2}>
          {moTa}
        </Text>
        <Button variant='light' color='blue' fullWidth radius='md'>
          Đặt vé
        </Button>
      </Group>
    </Box>
  );
};

export default MovieItem;
