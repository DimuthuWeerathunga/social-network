import React, { FC, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../../context/authentication-context';

interface LoginFormOutput {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const auth = useContext(AuthContext);

  const onFinish = async (values: LoginFormOutput): Promise<void> => {
    let response: AxiosResponse<{token: string}> | undefined;
    try {
      response = await axios.post(
        import.meta.env.VITE_AUTH_SERVICE_BACKEND_URL + '/signin',
        values
      );
      console.log(response?.data);
    } catch (error) {
       console.error(error)
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data.message);
      }
    }
    if (response?.data) {
      auth.onLogin?.(response.data.token);
    }
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      size='large'
    >
      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message: 'Please enter your Email!',
          },
          {
            type: 'email',
            message: 'Email should be valid!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Email'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please enter your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form-button'
          block
        >
          Log in
        </Button>
        <span
          style={{
            marginLeft: '1rem',
            display: 'inline-block',
            marginTop: '1rem',
          }}
        >
          Or <Link to='/'>Register now!</Link>
        </span>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
