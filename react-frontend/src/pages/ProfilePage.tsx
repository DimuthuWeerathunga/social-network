import React, { FC } from 'react';
import { Col, Row } from 'antd';
import Header from '../components/profile/header';
import BioSection from '../components/profile/BioSection';
import CredentialsSection from '../components/profile/CredentialsSection';

const ProfilePage: FC = () => {
  return (
    <Col span={20} offset={2}>
      <Row>
        <Header></Header>
        <BioSection></BioSection>
        <CredentialsSection></CredentialsSection>
      </Row>
    </Col>
  );
};

export default ProfilePage;
