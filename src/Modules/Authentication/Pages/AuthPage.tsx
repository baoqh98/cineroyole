import React from 'react';
import { Box, Container } from '@mantine/core';
import {
  Card,
  Center,
  Title,
  Space,
  PasswordInput,
  Group,
  Button,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import BackgroundAnimation from '../../../UI/BackgroundAnimation';

const AuthPage = () => {
  return (
    <Container
      size={1200}
      sx={{
        textAlign: 'left',
        height: '80vh',
      }}
    >
      <BackgroundAnimation />
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        })}
      >
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthPage;
