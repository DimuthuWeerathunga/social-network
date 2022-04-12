import React from 'react';
import { Card, Avatar, Col } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

function UserCard() {
  return (
    <Col xs={20} sm={12} md={10} lg={9} xl={8}>
      <Card
        style={{ width: 'auto' }}
        actions={[
          <SettingOutlined key='setting' />,
          <EditOutlined key='edit' />,
          <EllipsisOutlined key='ellipsis' />,
        ]}
      >
        <Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title='Card title'
          description='This is the description'
        />
      </Card>
    </Col>
  );
}

export default UserCard;
