import React, { FC, FunctionComponent, ComponentClass, CSSProperties } from 'react';
import { Space, Button } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface IconTextProps {
  icon: string | FunctionComponent | ComponentClass;
  text: string | number;
  haveButton?: boolean;
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
  size?: SizeType;
  ghost?: boolean | undefined;
  style?: CSSProperties
}

const IconText: FC<IconTextProps> = ({ icon, text, haveButton, type, ghost = undefined, size, style }) => {
  return (
    <Space style={style} >
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
};

export default IconText;
