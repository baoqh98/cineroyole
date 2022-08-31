import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Text,
  Space,
} from '@mantine/core';
import Logo from '../../../../UI/Logo/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../Authentication/slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, authSelector } from '../../../../app/store';
import { useState } from 'react';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

export interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

const HeaderNavigation = ({ links }: HeaderActionProps) => {
  const userData = JSON.parse(localStorage.getItem('Ciner') || 'null');
  const { accessToken } = useSelector(authSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  const logOutHandler = () => {
    dispatch(logOut());
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger='hover' exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={16}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size='sm'
          />
          <Logo size={48} />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {accessToken && userData && (
          <Group>
            <Group>
              <FontAwesomeIcon icon={faUser} />
              <Text>{userData.taiKhoan}</Text>
            </Group>
            <Button onClick={logOutHandler} variant='subtle'>
              Đăng xuất
            </Button>
          </Group>
        )}
        {!accessToken && !userData && (
          <Group>
            <Button
              radius='md'
              sx={{ height: 36 }}
              onClick={() => navigate('/auth/login')}
            >
              Login
            </Button>
            <Button
              variant='outline'
              radius='md'
              sx={{ height: 36 }}
              onClick={() => navigate('/auth/register')}
            >
              Register
            </Button>
          </Group>
        )}
      </Container>
    </Header>
  );
};

export default HeaderNavigation;
