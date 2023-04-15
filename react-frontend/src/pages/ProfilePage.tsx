import React, { FC } from 'react';
import { Col, Row } from 'antd';

const ProfilePage: FC = () => {
    return (
      <Col span={16} offset={4} style={{ marginTop: '4rem', height: '100%' }}>
        <Row style={{height: '25%', backgroundColor: 'cyan'}}>
          Hello there
        </Row>
      </Col>
    );
};

export default ProfilePage;
