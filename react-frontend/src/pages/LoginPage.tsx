import React, { FC } from 'react';
import { Col } from 'antd';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: FC = () => {
  return (
    <Col span={12} offset={6} style={{ marginTop: '4rem' }}>
      <LoginForm />
    </Col>
  );
};

export default LoginPage;
