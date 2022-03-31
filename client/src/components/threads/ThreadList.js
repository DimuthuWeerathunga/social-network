import React from 'react';
import { List, Avatar, Pagination } from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';

import IconText from '../shared/IconText';

import './ThreadList.css';

const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i + 1}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: (
      <div>
        We supply a series of design principles, practical patterns and high
        quality
      </div>
    ),
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

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
                icon={LikeOutlined}
                text='156'
                key='list-vertical-like-o'
                haveButton
                type='primary'
              />,
              <IconText
                icon={DislikeOutlined}
                text='156'
                key='list-vertical-dislike-o'
                haveButton
                type='danger'
                ghost
              />,
              <IconText
                icon={MessageOutlined}
                text='2'
                key='list-vertical-message'
              />,
            ]}
            // extra={
            //   <img
            //     width={272}
            //     alt='logo'
            //     src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
            //   />
            // }
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
        style={{ margin: '2rem 1rem 2rem 0', textAlign: 'right' }}
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
