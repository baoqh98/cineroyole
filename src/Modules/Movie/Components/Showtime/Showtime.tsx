import {
  Container,
  SegmentedControl,
  Center,
  Image,
  Grid,
  Card,
  Text,
  Group,
  ScrollArea,
  Button,
  Title,
  Space,
} from '@mantine/core';
import React, { useMemo, useState } from 'react';

interface LichChieuPhim {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
  thoiLuong: number;
}

interface CumRapChieu {
  lichChieuPhim: LichChieuPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

interface TheaterSystem {
  cumRapChieu: CumRapChieu[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}

interface Props {
  theaterSystem: TheaterSystem[] | [];
}

const Showtime = ({ theaterSystem }: Props) => {
  const defaultValue = theaterSystem[0]?.maHeThongRap || '';
  const [theaterCluster, setTheaterCluster] = useState<string>(defaultValue);

  const calendarItems = theaterSystem
    ?.filter((item) => item.maHeThongRap === theaterCluster)
    .map((item) => (
      <Group
        sx={(theme) => ({
          alignItems: 'flex-start',
          flexWrap: 'nowrap',
          width: '100%',
        })}
        key={item.maHeThongRap}
      >
        {item.cumRapChieu.map((item) => (
          <Card
            sx={(theme) => ({
              width: 320,
              backgroundColor: theme.colors.gray[9],
            })}
            key={item.maCumRap}
            p='lg'
            radius='md'
            withBorder
          >
            <Title order={4}>{item.tenCumRap}</Title>
            <Text>{item.diaChi}</Text>
            <Space h={16} />

            {item.lichChieuPhim.slice(-5).map((item) => (
              <Group
                key={item.maLichChieu}
                sx={{
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <Text>{item.tenRap}:</Text>
                <Button
                  variant='light'
                  size='sm'
                  color='green'
                  key={item.maLichChieu}
                  sx={(theme) => ({
                    width: 200,
                  })}
                >
                  {new Date(item.ngayChieuGioChieu).toLocaleString()}
                </Button>
              </Group>
            ))}
          </Card>
        ))}
      </Group>
    ));

  const segmentedItems = useMemo(() => {
    return theaterSystem?.map((item) => ({
      value: item.maHeThongRap,
      label: (
        <Center key={item.maHeThongRap}>
          <Image src={item.logo} height={40} width={40} />
        </Center>
      ),
    }));
  }, [theaterSystem]);

  return (
    <Container size={1200}>
      <Grid>
        <Grid.Col sm={2}>
          {theaterSystem && theaterSystem?.length > 0 && (
            <SegmentedControl
              onChange={(value) => setTheaterCluster(value)}
              sx={(theme) => ({
                backgroundColor: 'transparent',
              })}
              color='blue'
              radius='lg'
              orientation='vertical'
              size='md'
              data={segmentedItems || []}
              fullWidth
            />
          )}
        </Grid.Col>
        <Grid.Col sm={10}>
          <ScrollArea>{calendarItems}</ScrollArea>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Showtime;
