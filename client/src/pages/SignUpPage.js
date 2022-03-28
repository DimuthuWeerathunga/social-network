import React from 'react';
import { Col } from 'antd';

import AppHeader from '../components/Navigation/AppHeader';
import SignUpForm from '../components/auth/SignUpForm';

function SignUpPage() {
  return (
    <>
      <AppHeader />
      <Col
        span={12}
        offset={4}
        style={{ marginTop: '4rem', paddingBottom: '4rem' }}
      >
        <SignUpForm></SignUpForm>
      </Col>
    </>
  );
}

export default SignUpPage;
