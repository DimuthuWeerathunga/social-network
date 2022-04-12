import React, { useContext } from 'react';
import { Menu } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';

import { NavigationContext } from '../../context/navigation-context';

function AppLeftSider() {
  const navigation = useContext(NavigationContext);

  return (
    <Menu
      theme='light'
      mode='inline'
      selectedKeys={[navigation.currentlyActiveNav]}
      onClick={navigation.handleNavClick}
      style={{ marginTop: '2rem' }}
    >
      <Menu.Item key='profile' icon={<UsergroupAddOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key='people' icon={<UsergroupAddOutlined />}>
        Explore Friends
      </Menu.Item>
    </Menu>
  );
}

export default AppLeftSider;
