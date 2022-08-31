import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Text,
  Box,
  Card,
  Group,
  Image,
  Space,
  Title,
  Grid,
  Divider,
  MantineTheme,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import {
  DanhSachGheElement,
  ThongTinPhim,
} from '../../../../app/interface/ticket/ticket';
import { selectedTicketsSelector } from '../../../../app/store';

interface Props {
  movieDetail: ThongTinPhim;
  seats: DanhSachGheElement[];
}

const TicketsDetail = ({ movieDetail, seats }: Props) => {
  const { danhSachVe } = useSelector(selectedTicketsSelector);
  const {
    hinhAnh,
    tenPhim,
    ngayChieu,
    gioChieu,
    diaChi,
    tenCumRap,
    tenRap,
    maLichChieu,
  } = movieDetail;

  const selectedSeats = seats.filter((seat) =>
    danhSachVe.some((item) => item.maGhe === seat.maGhe)
  );

  const totalAmount = selectedSeats
    .map((seat) => seat.giaVe)
    .reduce((prev, cur) => {
      return prev + cur;
    }, 0);

  const textStyle = (theme: MantineTheme) => ({
    display: 'inline-block',
    borderRadius: '8px',
    fontSize: 16,
    padding: '8px 12px',
    color: theme.colors.yellow[8],
    backgroundColor: theme.colors.gray[3],
  });

  return (
    <Card
      radius='xl'
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[2],
        color: theme.colors.blue,
        textAlign: 'center',
      })}
    >
      <Box
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={(theme) => ({
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: `4px solid ${theme.colors.blue[5]}`,
            overflow: 'hidden',
          })}
          mx='auto'
        >
          <Image src={hinhAnh} fit='cover' withPlaceholder />
        </Box>
      </Box>
      <Space h={16} />
      <Title order={2}>{tenPhim || '...'}</Title>
      <Space h={16} />

      <Grid>
        <Grid.Col span={6}>
          <Title order={4}>Ngày:</Title>
          <Space h={8} />
          <Text sx={(theme) => textStyle(theme)}>
            {ngayChieu || '--/--/--'}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>Giờ:</Title>
          <Space h={8} />
          <Text sx={(theme) => textStyle(theme)}>{gioChieu || '-:-'}</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Title order={4}>Cụm:</Title>
          <Space h={8} />
          <Text sx={(theme) => textStyle(theme)}>
            {tenCumRap || '--/--/--'}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>Rạp:</Title>
          <Space h={8} />
          <Text sx={(theme) => textStyle(theme)}>{tenRap || '-:-'}</Text>
        </Grid.Col>
      </Grid>
      <Space h={16} />
      <Text>
        <FontAwesomeIcon icon={faLocationDot} /> {diaChi}
      </Text>
      <Space h={32} />

      <Divider
        sx={{
          position: 'relative',
        }}
        size={'md'}
        variant='dashed'
        label={
          <>
            <Box
              sx={(theme) => ({
                position: 'absolute',
                left: -56,
                height: 56,
                width: 56,
                backgroundColor: theme.colors.dark[7],
                borderRadius: '50%',
                zIndex: 100,
              })}
            />
            <Box
              sx={(theme) => ({
                position: 'absolute',
                right: -56,
                height: 56,
                width: 56,
                backgroundColor: theme.colors.dark[7],
                borderRadius: '50%',
                zIndex: 100,
              })}
            />
          </>
        }
      />

      <Space h={32} />
      <Group
        sx={(theme) => ({
          color: theme.colors.gray[5],
        })}
      >
        <Text>id:{maLichChieu}</Text>
        <Text>{}</Text>

        {selectedSeats.map((seat) => (
          <Text
            key={seat.maGhe}
            sx={(theme) => ({
              ...textStyle(theme),
              fontWeight: 500,
              color: theme.colors.yellow,
            })}
          >
            {seat.tenGhe}
          </Text>
        ))}
      </Group>
      <Space h={24} />

      <Text
        sx={(theme) => ({
          fontSize: 32,
          fontWeight: 500,
          backgroundColor: theme.colors.gray[3],
          borderRadius: '4px',
          color: theme.colors.green,
        })}
      >
        {totalAmount}
      </Text>
      <Space h={16} />
    </Card>
  );
};

export default TicketsDetail;
