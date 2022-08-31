import { useState } from 'react';

// UI
import { Container, Group, Loader, Pagination } from '@mantine/core';
import MovieList from './MovieList';
import useRequest from '../../../../app/hooks/useRequest';
import { Movie } from '../../../../app/interface/movie/movie';
import cineAPI from '../../../../app/apis/cineAPI';

const MovieShowing = () => {
  const [page, setPage] = useState<number>(1);

  const { movieAPI } = cineAPI;
  const { data: movies, isLoading } = useRequest<Movie>(movieAPI.getMovies);

  const chunkSize = 8;
  const totalPages = Math.ceil(movies.length / chunkSize);
  const pages = [];
  for (let i = 0; i < movies.length; i += chunkSize) {
    pages.push(movies.slice(i, i + chunkSize));
  }

  return (
    <Container size={1200}>
      {isLoading && <Loader size={100} variant='dots' />}
      {!isLoading && movies?.length > 0 && (
        <>
          <MovieList movies={pages[page - 1]} />
          <Group
            mt={48}
            sx={() => ({
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Pagination
              size='lg'
              total={totalPages}
              initialPage={1}
              onChange={setPage}
            />
          </Group>
        </>
      )}
    </Container>
  );
};

export default MovieShowing;
