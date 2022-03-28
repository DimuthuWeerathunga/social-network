import React, { useState } from 'react';
import { Menu, Row, Col } from 'antd';
import {
  UnorderedListOutlined,
  RiseOutlined,
  CaretUpOutlined,
  DribbbleOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Layout, Input } from 'antd';

const {
  Header,
  // Footer,
  // Content
} = Layout;
const { Search } = Input;

// const { SubMenu } = Menu;

function AppHeader() {
  const [current, setCurrent] = useState('new');

  const onSearch = (value) => console.log(value);

  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Header
        style={{
          backgroundColor: 'white',
          // display: 'flex',
          // justifyContent: 'space-around',
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
              onClick={handleClick}
              selectedKeys={[current]}
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
          onClick={handleClick}
          selectedKeys={[current]}
          mode='horizontal'
          theme='light'
        >
          <Menu.Item
            key='trending'
            icon={<RiseOutlined />}
            style={{ marginLeft: 'auto' }}
          >
            TRENDING
          </Menu.Item>
          <Menu.Item key='new' icon={<CaretUpOutlined />}>
            NEW
          </Menu.Item>
          <Menu.Item key='categories' icon={<UnorderedListOutlined />}>
            CATEGORIES
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
