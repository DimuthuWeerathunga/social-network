import React from 'react';
import { PlusCircleOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Col } from 'antd';

import ActionButton from './ActionButton';

import './ActionButtonColumn.css';

function ActionButtonColumn({
  currentlyActiveNav,
  setCurrentlyActiveNav,
  handleNavClick,
}) {
  return (
    <Col className='action-button-column'>
      <ActionButton
        menuOptions={[{ link: '/newThread', text: 'Add a new thread' }]}
        icon={<PlusCircleOutlined />}
      ></ActionButton>
      <ActionButton
        menuOptions={[{ link: '/', text: 'Share this thread' }]}
        icon={<ShareAltOutlined />}
      ></ActionButton>
      <ActionButton
        menuOptions={[{ link: '/', text: 'Add a new thread' }]}
        icon={<PlusCircleOutlined />}
      ></ActionButton>
    </Col>
  );
}

export default ActionButtonColumn;
