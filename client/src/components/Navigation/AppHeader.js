import React from 'react';
import { useContext } from 'react';
import { Menu, Row, Col } from 'antd';
import { Layout, Input } from 'antd';
import {
  UnorderedListOutlined,
  RiseOutlined,
  CaretUpOutlined,
  DribbbleOutlined,
  LoginOutlined,
  UserAddOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { NavigationContext } from '../../context/navigation-context';

const {
  Header,
  // Footer,
  // Content
} = Layout;
const { Search } = Input;

// const { SubMenu } = Menu;

function AppHeader() {
  const navigation = useContext(NavigationContext);

  const onSearch = (value) => console.log(value);

  return (
    <>
      <Header
        style={{
          backgroundColor: 'white',
        }}
      >
        <Row>
          <Col
            span={14}
            offset={1}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Search
              placeholder='search here'
              allowClear
              enterButton='Search'
              size='large'
              onSearch={onSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col
            span={8}
            offset={1}
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Menu
              style={{ width: '100%' }}
              onClick={navigation.handleNavClick}
              selectedKeys={[navigation.currentlyActiveNav]}
              mode='horizontal'
            >
              <Menu.Item key='login' icon={<LoginOutlined />}>
                Login
              </Menu.Item>
              <Menu.Item key='signup' icon={<UserAddOutlined />}>
                SingUp
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Header
        style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Menu
          style={{ width: '100%' }}
          onClick={navigation.handleNavClick}
          selectedKeys={[navigation.currentlyActiveNav]}
          mode='horizontal'
          theme='light'
        >
          <Menu.Item
            key='home'
            icon={<HomeOutlined />}
            style={{ marginLeft: 'auto' }}
          >
            HOME
          </Menu.Item>
          <Menu.Item key='trending' icon={<RiseOutlined />}>
            TRENDING
          </Menu.Item>
          <Menu.Item key='new' icon={<CaretUpOutlined />}>
            NEW
          </Menu.Item>
          <Menu.Item key='topics' icon={<UnorderedListOutlined />}>
            Explore Topics
          </Menu.Item>
          <Menu.Item
            key='free-ads'
            icon={<DribbbleOutlined />}
            style={{ marginRight: 'auto' }}
          >
            FREE ADS
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
}

export default AppHeader;
