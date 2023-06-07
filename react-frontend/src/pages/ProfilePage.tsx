import React, { FC } from 'react';
import { Col, Row } from 'antd';
import BioSection from '../components/profile/BioSection';
import CredentialsSection from '../components/profile/CredentialsSection';
import Header from '../components/profile/Header';

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
