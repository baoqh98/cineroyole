import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { Carousel } from '@mantine/carousel';
import { Box, Image } from '@mantine/core';
import useRequest from '../../../../app/hooks/useRequest';
import { Banner } from '../../../../app/interface/banner/banner';
import cineAPI from '../../../../app/apis/cineAPI';

const BannerCarousel = () => {
  const { bannerAPI } = cineAPI;
  const { data: banners } = useRequest<Banner>(bannerAPI.getBanners);

  return (
    <Carousel
      sx={{
        border: 'none',
      }}
      mx={'auto'}
      withIndicators
      nextControlIcon={
        <FontAwesomeIcon
          icon={faChevronRight}
          fontSize={24}
          style={{ backgroundColor: 'transparent', padding: '12px 16px' }}
        />
      }
      previousControlIcon={
        <FontAwesomeIcon
          icon={faChevronLeft}
          fontSize={24}
          style={{ backgroundColor: 'transparent', padding: '12px 16px' }}
        />
      }
    >
      {banners?.map((item: Banner) => {
        return (
          <Carousel.Slide
            key={item.maBanner}
            sx={{
              position: 'relative',
            }}
          >
            <Box
              sx={(theme) => ({
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '88px',
                width: '88px',
                fontSize: '32px',
                zIndex: 10,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50px',
                backgroundColor: theme.colors.dark[3],
                opacity: 0.8,
                color: theme.colors.dark[9],
                cursor: 'pointer',
                transition: 'all ease 0.2s',
                '&:hover': {
                  backgroundColor: theme.colors.gray[4],
                  opacity: 1,
                },
                '&:active': {
                  transform: 'translate(-50%, -45%)',
                },
              })}
            >
              <FontAwesomeIcon icon={faPlay} pointerEvents={'none'} />
            </Box>
            <Image
              height='560px'
              fit='cover'
              src={item.hinhAnh}
              alt={item.hinhAnh}
              withPlaceholder
            />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default BannerCarousel;
