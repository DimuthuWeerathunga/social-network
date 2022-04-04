import React from 'react';
import { Col } from 'antd';
import LoginForm from '../components/auth/LoginForm';
import AppHeader from '../components/Navigation/AppHeader';

function LoginPage({
  currentlyActiveNav,
  setCurrentlyActiveNav,
  handleNavClick,
}) {
  return (
    <>
      <AppHeader
        currentlyActiveNav={currentlyActiveNav}
        setCurrentlyActiveNav={setCurrentlyActiveNav}
        handleNavClick={handleNavClick}
      />
      <Col span={12} offset={6} style={{ marginTop: '4rem' }}>
        <LoginForm />
      </Col>
    </>
  );
}

export default LoginPage;
