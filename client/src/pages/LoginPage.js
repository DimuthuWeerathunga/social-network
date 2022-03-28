import React from 'react';
import { Col } from 'antd';
import LoginForm from '../components/auth/LoginForm';
import AppHeader from '../components/Navigation/AppHeader';

function LoginPage() {
  return (
    <>
      <AppHeader />
      <Col span={12} offset={6} style={{ marginTop: '4rem' }}>
        <LoginForm />
      </Col>
    </>
  );
}

export default LoginPage;
