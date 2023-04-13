import React, { FC } from 'react';
import { List } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.'
];

const TopicsList: FC = () => {
  return (
    <List
      style={{ width: '100%' }}
      size='large'
      //   header={<div>Header</div>}
      //   footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      // pagination
    />
  );
};

export default TopicsList;
