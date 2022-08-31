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
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '@mantine/form';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../../../app/interface/auth/authLogin';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, authSelector } from '../../../../app/store';
import { login } from '../../slice/authSlice';
import Home from '../../../Home/Pages/Home';

const Login = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const { accessToken, isLoading, error } = useSelector(authSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submitHandler = async (values: LoginUser) => {
    try {
      await dispatch(login(values)).unwrap();
      setIsError(false);
      navigate(-1);
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

  if (accessToken) {
    return <Navigate to='/' />;
  }

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
