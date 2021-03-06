import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function LoginForm() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
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
          Or <Link to='/'>register now!</Link>
        </span>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
