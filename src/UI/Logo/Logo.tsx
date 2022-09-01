import { createStyles } from '@mantine/core';
import React from 'react';
import { Size } from './LogoStyle';

const Logo = ({ size, name }: Size) => {
  return (
    <div>
      <img
        src='https://w7.pngwing.com/pngs/130/1021/png-transparent-movie-logo-movie-logo-film-tape-cinema.png'
        height={size}
        width={'100%'}
        style={{
          objectFit: 'contain',
        }}
        alt={name || 'main logo'}
      />
    </div>
  );
};

export default Logo;
