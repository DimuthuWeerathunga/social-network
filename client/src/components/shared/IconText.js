import React from 'react';
import { Space, Button } from 'antd';

function IconText({ icon, text, haveButton, type, ghost, size }) {
  return (
    <Space>
      {haveButton ? (
        <Button
          type={type}
          ghost={ghost}
          size={size}
          icon={React.createElement(icon)}
        >
          {text}
        </Button>
      ) : (
        <>
          {React.createElement(icon)}
          {text}
        </>
      )}
    </Space>
  );
}

export default IconText;
