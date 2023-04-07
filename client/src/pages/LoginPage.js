import React from 'react';
import {Col} from 'antd';
import LoginForm from '../components/auth/LoginForm';
import {SECONDARY_BG_COLOR} from '../global-settings/colors';

function LoginPage() {
  return (
    <div
      style={{
        backgroundColor: SECONDARY_BG_COLOR,
      }}
    >
      <Col span={12} offset={6} style={{marginTop: '4rem'}}>
        <LoginForm/>
      </Col>
    </div>
  );
}

export default LoginPage;
