import React, { useState } from 'react';
import {
  Card,
  Center,
  Title,
  Space,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Alert,
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import useRequest from '../../../../app/hooks/useRequest';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../../../app/interface/auth/authRegister';
import cineAPI from '../../../../app/apis/cineAPI';

const Register = () => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { authAPI } = cineAPI;

  const formValidate = useForm({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      hoTen: '',
    },
    validate: {
      taiKhoan: (value) => (value === '' ? 'Không được để trống' : null),
      matKhau: (value) => (value === '' ? 'Không được để trống' : null),
      email: (value) => (value === '' ? 'Không được để trống' : null),
      soDt: (value) => (value === '' ? 'Không được để trống' : null),
      hoTen: (value) => (value === '' ? 'Không được để trống' : null),
    },
  });

  const { data: registerHandler, isLoading } = useRequest(
    (values) => authAPI.register(values),
    { isManual: true }
  );

  const submitHandler = async (values: RegisterUser) => {
    try {
      await registerHandler(values);
      setError('');
      navigate('/auth/login');
    } catch (error) {
      setError(error as string);
    }
  };

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
        <Title
          sx={{
            textAlign: 'center',
          }}
          order={1}
        >
          Đăng Ký Tài Khoản
        </Title>
      </Center>

      <Space h={24} />
      <form onSubmit={formValidate.onSubmit(submitHandler)}>
        <TextInput
          width={'50%'}
          label='Tài khoản:'
          placeholder='Nhập tài khoản'
          {...formValidate.getInputProps('taiKhoan')}
        />
        <Space h={16} />
        <PasswordInput
          width={'50%'}
          label='Mật khẩu:'
          placeholder='Nhập mật khẩu'
          {...formValidate.getInputProps('matKhau')}
        />
        <Space h={16} />
        <TextInput
          width={'50%'}
          label='Email:'
          placeholder='Nhập Email'
          {...formValidate.getInputProps('email')}
        />
        <Space h={16} />
        <TextInput
          width={'50%'}
          label='Số điện thoại:'
          placeholder='Nhập Số điện thoại'
          {...formValidate.getInputProps('soDt')}
        />
        <Space h={16} />
        <TextInput
          width={'50%'}
          label='Họ và Tên:'
          placeholder='Nhập Họ và Tên'
          {...formValidate.getInputProps('hoTen')}
        />
        <Space h={32} />
        <Group position='right'>
          <Button variant='subtle' onClick={() => navigate('/auth/login')}>
            Bạn đã có tài khoản?
          </Button>
          <Button type='submit' loading={isLoading}>
            Đăng Ký
          </Button>
        </Group>

        <Space h={16} />
        {error && (
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

export default Register;
