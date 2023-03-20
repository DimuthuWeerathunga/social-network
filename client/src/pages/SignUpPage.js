import React from 'react';
import { Col } from 'antd';

import AppHeader from '../components/Navigation/AppHeader';
import SignUpForm from '../components/auth/SignUpForm';
import { SecondaryBGColor } from '../global-settings/colors';

function SignUpPage(props) {
  return (
    <div style={{ backgroundColor: SecondaryBGColor, minHeight: '100vh' }}>
      <AppHeader {...props} />
      <Col
        span={12}
        offset={4}
        style={{ marginTop: '4rem', paddingBottom: '4rem' }}
      >
        <SignUpForm></SignUpForm>
      </Col>
    </div>
  );
}

export default SignUpPage;
