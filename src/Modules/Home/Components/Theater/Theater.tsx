import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, theaterBrandsSelector } from '../../../../app/store';
import { getTheaterBrands } from '../../slice/theater/theaterBrandsSlice';

// UI
import {
  Center,
  Container,
  Image,
  SegmentedControl,
  Select,
  Space,
  Loader,
} from '@mantine/core';
import TheaterList from './TheaterList';
import { useMediaQuery } from '@mantine/hooks';
import TheaterShowtime from './TheaterShowtime';

const Theater = () => {
  const isMobile = useMediaQuery('(max-width: 576px)');
  const [theaterId, setTheaterId] = useState<string>();
  const { theaterBrands, isLoading } = useSelector(theaterBrandsSelector);
  const defaultTheater = theaterBrands[0]?.maHeThongRap;
  const dispatch = useDispatch<AppDispatch>();
  const [theaterCluster, setTheaterCluster] = useState<string>('');

  useEffect(() => {
    dispatch(getTheaterBrands());
  }, []);

  const segmentedItems = theaterBrands?.map((item) => ({
    value: item.maHeThongRap,
    label: (
      <Center>
        <Image src={item.logo} height={40} width={40} />
      </Center>
    ),
  }));

  const selectItems = theaterBrands?.map((item) => ({
    value: item.maHeThongRap,
    label: item.tenHeThongRap,
  }));

  return (
    <Container size={1200}>
      {isLoading && <Loader size={100} variant='dots' />}
      {!isLoading && theaterBrands.length > 0 && (
        <>
          {!isMobile && (
            <SegmentedControl
              onChange={(value) => setTheaterCluster(value)}
              data={segmentedItems}
              defaultValue={defaultTheater || ''}
              size='md'
              color='blue'
              radius={8}
              fullWidth
            />
          )}
          {isMobile && (
            <Select
              defaultValue={theaterCluster}
              data={selectItems}
              onChange={(value: string) => setTheaterCluster(value)}
            />
          )}
        </>
      )}
      <Space h={32} />
      <TheaterList
        onGetTheater={(id) => setTheaterId(id)}
        theaterCluster={theaterCluster || defaultTheater}
      />
      <Space h={32} />
      <TheaterShowtime
        theaterId={theaterId || ''}
        theaterCluster={theaterCluster}
      />
    </Container>
  );
};

export default Theater;
