import React from 'react';
import { PlusCircleOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Row } from 'antd';

import ActionButton from './ActionButton';

function ActionButtonColumn() {
  return (
    <Row
      style={{
        position: 'fixed',
        flexDirection: 'column',
        bottom: '1vh',
        marginLeft: '.4em',
      }}
    >
      <ActionButton
        menuOptions={[{ link: '/', text: 'Add a new thread' }]}
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
    </Row>
  );
}

export default ActionButtonColumn;
