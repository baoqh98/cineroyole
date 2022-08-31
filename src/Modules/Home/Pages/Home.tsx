import React from 'react';

import { Space } from '@mantine/core';
import BannerCarousel from '../Components/BannerCarousel';
import HeaderNavigation from '../Components/HeaderNavigation';
import MovieShowing from '../Components/MovieShowing';
import Theater from '../Components/Theater';
import News from '../Components/News';

const linksHeader = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/',
    label: 'Showtimes',
  },
  {
    link: '/',
    label: 'News',
  },
  {
    link: '/',
    label: 'App',
  },
  {
    link: '/',
    label: 'About',
  },
];

const Home = () => {
  return (
    <>
      <HeaderNavigation links={linksHeader} />
      <BannerCarousel />
      <Space h={48} />
      <MovieShowing />
      <Space h={48} />
      <Theater />
      <Space h={48} />
      <News />
      <div style={{ height: 200 }}></div>
    </>
  );
};

export default Home;
