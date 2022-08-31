import { Grid, Transition } from '@mantine/core';
import { Movie } from '../../../../app/interface/movie/movie';

import MovieItem from './MovieItem';

interface Props {
  movies: Movie[];
}

const MovieList = ({ movies }: Props) => {
  return (
    <Grid gutter={32}>
      {movies?.map((movie) => {
        return (
          <Grid.Col key={movie.maPhim.toString()} md={6} lg={3}>
            <MovieItem movie={movie} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default MovieList;
