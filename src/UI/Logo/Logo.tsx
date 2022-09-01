import { createStyles } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Size } from './LogoStyle';

const Logo = ({ size, name }: Size) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        cursor: 'pointer',
      }}
      onClick={() => navigate('/')}
    >
      <img
        src='/kisspng-cinema-film-director-television-film-digital-millennium-copyright-act-5b23cf472887a5.197278891529073479166-removebg-preview.png'
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
