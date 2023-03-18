import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';

import AppHeader from '../components/Navigation/AppHeader';
import AppLeftSider from '../components/sider/AppLeftSider';
import ActionButtonColumn from '../components/Navigation/ActionButtonColumn';
import {
  PrimaryBGColor,
  PrimaryTextColor,
  SecondaryBGColor,
  TertiaryBGColor,
} from '../global-settings/colors';

import './AppLayout.css';

const { Sider, Content } = Layout;

function AppLayout() {
  return (
    <Layout
      style={{
        backgroundColor: PrimaryBGColor,
        fontWeight: 600,
        color: PrimaryTextColor,
      }}
    >
      <AppHeader></AppHeader>
      <Layout
        style={{
          backgroundColor: PrimaryBGColor,
        }}
      >
        <Sider
          className='hide-on-small'
          style={{
            overflow: 'auto',
            height: '80vh',
            backgroundColor: PrimaryBGColor,
          }}
        >
          <AppLeftSider></AppLeftSider>
        </Sider>
        <Content
          style={{
            overflow: 'auto',
            backgroundColor: SecondaryBGColor,
            height: '80vh',
            borderRadius: '2rem',
          }}
        >
          <Row
            style={{
              marginTop: '3rem',
              marginBottom: '3rem',
              minHeight: '60vh',
            }}
          >
            <Col
              span={21}
              offset={1}
              style={{
                backgroundColor: SecondaryBGColor,
                borderRadius: '2rem',
              }}
            >
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
        <Sider
          className='hide-on-small'
          style={{
            backgroundColor: PrimaryBGColor,
          }}
        >
          {/* right sidebar */}
        </Sider>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
