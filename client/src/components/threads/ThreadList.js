import React from 'react';
import { List, Avatar, Space, Pagination } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import './ThreadList.css';
import { Link } from 'react-router-dom';

const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i + 1}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: (
      <div>
        <Link to={'/'}>This leads to op</Link>
      </div>
    ),
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function ThreadList() {
  return (
    <>
      <List
        itemLayout='vertical'
        size='large'
        pagination={false}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text='156'
                key='list-vertical-star-o'
              />,
              <IconText
                icon={LikeOutlined}
                text='156'
                key='list-vertical-like-o'
              />,
              <IconText
                icon={MessageOutlined}
                text='2'
                key='list-vertical-message'
              />,
            ]}
            extra={
              <img
                width={272}
                alt='logo'
                src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      <Pagination
        style={{ marginTop: '2rem', textAlign: 'right' }}
        defaultPageSize={20}
        pageSizeOptions={['20', '25', '30']}
        showSizeChanger={true}
        locale={{ items_per_page: '' }}
        total={1005}
        onChange={() => {
          console.log('on change works');
        }}
      ></Pagination>
    </>
  );
}

export default ThreadList;
