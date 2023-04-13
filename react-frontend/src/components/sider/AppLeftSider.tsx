import React, { FC, useContext } from 'react';
import { Menu } from 'antd';
import { UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';

import { NavigationContext } from '../../context/navigation-context';
import { PRIMARY_BG_COLOR } from '../../global-settings/colors';


const AppLeftSider: FC = () => {
  const navigation = useContext(NavigationContext);

  return (
    <Menu
      theme='light'
      mode='inline'
      selectedKeys={[navigation.currentlyActiveNav]}
      onClick={navigation.handleNavClick}
      style={{ marginTop: '2rem', backgroundColor: PRIMARY_BG_COLOR }}
    >
      <Menu.Item key='profile' icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key='people' icon={<UsergroupAddOutlined />}>
        Explore Friends
      </Menu.Item>
    </Menu>
  );
}

export default AppLeftSider;
