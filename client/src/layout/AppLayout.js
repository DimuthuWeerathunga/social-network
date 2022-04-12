import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';

import AppHeader from '../components/Navigation/AppHeader';
import AppLeftSider from '../components/sider/AppLeftSider';
import ActionButtonColumn from '../components/Navigation/ActionButtonColumn';

import './AppLayout.css';

const { Sider, Content } = Layout;

function AppLayout() {
  return (
    <Layout>
      <AppHeader></AppHeader>
      <Layout>
        <Sider
          className='hide-on-small'
          style={{
            overflow: 'scroll',
            height: '80vh',
            backgroundColor: 'white',
          }}
        >
          <AppLeftSider></AppLeftSider>
        </Sider>
        <Content
          style={{
            overflow: 'scroll',
            height: '80vh',
          }}
        >
          <Row
            style={{
              marginTop: '3rem',
              marginBottom: '3rem',
              minHeight: '60vh',
            }}
          >
            <Col span={21} offset={1} style={{ backgroundColor: 'white' }}>
              <Outlet />
            </Col>
            <Col
              span={2}
              // style={{ position: 'relative' }}
            >
              <ActionButtonColumn></ActionButtonColumn>
            </Col>
          </Row>
        </Content>
        <Sider className='hide-on-small' theme='light'>
          right sidebar
        </Sider>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
