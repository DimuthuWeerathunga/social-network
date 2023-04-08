import React from 'react';
import { Menu, Dropdown, Button, Row } from 'antd';

import { Link } from 'react-router-dom';

function ActionButton({ icon, menuOptions, onClick }) {
  const menu = (
    <Menu>
      {menuOptions.map((menuOption) => (
        <Menu.Item key={menuOption.link}>
          <Link to={menuOption.link}>{menuOption.text}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Row style={{ marginTop: '1.5rem' }}>
      <Dropdown overlay={menu} placement="topRight" arrow>
        <Button
          style={{ boxShadow: '2px 8px 10px #AAA' }}
          type="primary"
          shape="circle"
          size="large"
          icon={icon}
          onClick={onClick}
        ></Button>
      </Dropdown>
    </Row>
  );
}

export default ActionButton;
