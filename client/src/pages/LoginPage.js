import React from 'react';
import { Col } from 'antd';
import LoginForm from '../components/auth/LoginForm';
import AppHeader from '../components/Navigation/AppHeader';
import { SecondaryBGColor } from '../global-settings/colors';

function LoginPage({
  currentlyActiveNav,
  setCurrentlyActiveNav,
  handleNavClick,
}) {
  return (
    <div
      style={{
        backgroundColor: SecondaryBGColor,
        minHeight: '100vh',
      }}
    >
      <AppHeader
        currentlyActiveNav={currentlyActiveNav}
        setCurrentlyActiveNav={setCurrentlyActiveNav}
        handleNavClick={handleNavClick}
      />
      <Col span={12} offset={6} style={{ marginTop: '4rem' }}>
        <LoginForm />
      </Col>
    </div>
  );
}

export default LoginPage;
