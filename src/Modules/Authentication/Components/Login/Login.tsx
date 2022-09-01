import React, { useEffect, useState } from 'react';
import {
  Card,
  Center,
  Space,
  PasswordInput,
  TextInput,
  Button,
  Group,
  Title,
  Modal,
  Alert,
  Box,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '@mantine/form';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../../../app/interface/auth/authLogin';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, authSelector } from '../../../../app/store';
import { login } from '../../slice/authSlice';

const Login = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const { accessToken, isLoading, error } = useSelector(authSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submitHandler = async (values: LoginUser) => {
    try {
      await dispatch(login(values))
        .unwrap()
        .then(() => navigate(-1));
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      setIsError(false);
    }
    if (error) {
      setIsError(true);
    }
  }, [error]);

  const formValidate = useForm({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    initialErrors: {
      taiKhoan: '',
      matKhau: '',
    },
    validate: {
      taiKhoan: (value) =>
        value === '' ? 'Tài khoản không được để trống' : null,
      matKhau: (value) =>
        value === '' ? 'Mật khẩu không được để trống' : null,
    },
  });

  return (
    <Card
      sx={(theme) => ({
        backgroundColor: 'transparent',
        width: '50%',
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          width: '80%',
        },
        [`@media (max-width: 375px)`]: {
          width: '100%',
        },
      })}
    >
      <Box
        sx={(theme) => ({
          display: 'inline-block',
          marginLeft: 'auto',
          padding: '11px 16px',
          border: `1px solid`,
          borderColor: theme.colors.gray[2],
          borderRadius: '50%',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'all ease 0.2s',
          '&:hover': {
            backgroundColor: theme.colors.dark[6],
          },
        })}
        onClick={() => navigate('/')}
      >
        <FontAwesomeIcon icon={faX} />
      </Box>
      <Space h={24} />
      <Center>
        <Title order={1}>Đăng nhập</Title>
      </Center>
      <Space h={24} />
      <form onSubmit={formValidate.onSubmit(submitHandler)}>
        <TextInput
          onChange={() => setIsError(false)}
          width={'50%'}
          label='Tài khoản:'
          placeholder='Nhập tài khoản'
          {...formValidate.getInputProps('taiKhoan')}
        />
        <Space h={16} />
        <PasswordInput
          onChange={() => setIsError(false)}
          width={'50%'}
          label='Mật khẩu:'
          placeholder='Nhập mật khẩu'
          {...formValidate.getInputProps('matKhau')}
        />
        <Space h={32} />
        <Group position='right'>
          <Button variant='subtle' onClick={() => navigate('/auth/register')}>
            Bạn chưa có tài khoản?
          </Button>
          <Button type='submit' loading={isLoading}>
            Đăng nhập
          </Button>
        </Group>
        <Space h={16} />
        {error && isError && (
          <Alert
            color='red'
            icon={<FontAwesomeIcon icon={faTriangleExclamation} />}
          >
            {error}
          </Alert>
        )}
      </form>
    </Card>
  );
};

export default Login;
