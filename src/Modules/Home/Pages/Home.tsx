import React from 'react';

import { Space } from '@mantine/core';
import BannerCarousel from '../Components/BannerCarousel';
import MovieShowing from '../Components/MovieShowing';
import Theater from '../Components/Theater';
import News from '../Components/News';

const Home = () => {
  return (
    <>
      <BannerCarousel />
      <Space h={48} />
      <MovieShowing />
      <Space h={48} />
      <Theater />
      <Space h={48} />
    </>
  );
};

export default Home;
