import {
  Badge,
  Box,
  Grid,
  Group,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, theatersSelector } from '../../../../app/store';
import { getTheaters } from '../../slice/theater/theatersSlice';

interface Props {
  theaterCluster: string;
  onGetTheater: (theaterId: string) => void;
}

const TheaterList = ({ theaterCluster, onGetTheater }: Props) => {
  const { theaters, isLoading } = useSelector(theatersSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!theaterCluster) return;
    dispatch(getTheaters(theaterCluster));
  }, [theaterCluster]);

  return (
    <ScrollArea
      sx={(theme) => ({
        [`@media (max-width: 375px)`]: {
          width: 339,
        },
        textAlign: 'left',
      })}
    >
      <Group
        sx={(theme) => ({
          minHeight: 160,
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
        })}
      >
        {theaters?.map((item) => {
          return (
            <Box
              key={item.maCumRap}
              sx={(theme) => ({
                minWidth: 300,
                minHeight: 160,
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : '',
                textAlign: 'left',
                padding: theme.spacing.sm,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : '',
                },
              })}
              onClick={() => onGetTheater(item.maCumRap)}
            >
              <Title color='green' order={4}>
                {item.tenCumRap}
              </Title>
              <Text>{item.diaChi}</Text>
              <Badge color='green'>{item.danhSachRap?.length} box</Badge>
            </Box>
          );
        })}
      </Group>
    </ScrollArea>
  );
};

export default TheaterList;
