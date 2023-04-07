import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Pagination } from 'antd';
import {
  MessageOutlined,
  LikeOutlined,
  DislikeOutlined,
} from '@ant-design/icons';

import IconText from '../shared/IconText';

import './ThreadList.css';
import {
  PRIMARY_BG_COLOR,
  SECONDARY_BG_COLOR,
  TERTIARY_BG_COLOR,
} from '../../global-settings/colors';

function ThreadList({ listData }) {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div style={{ backgroundColor: SECONDARY_BG_COLOR }}>
      <List
        itemLayout='vertical'
        size='large'
        pagination={false}
        dataSource={listData}
        style={{
          backgroundColor: SECONDARY_BG_COLOR,
        }}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            style={{
              borderRadius: '2rem',
              backgroundColor: PRIMARY_BG_COLOR,
              marginBottom: '1rem',
            }}
            actions={[
              <IconText
                icon={LikeOutlined}
                text='156'
                key='list-vertical-like-o'
                haveButton
                type='primary'
                size='small'
              />,
              <IconText
                icon={DislikeOutlined}
                text='156'
                key='list-vertical-dislike-o'
                haveButton
                type='danger'
                size='small'
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
              title={<Link to={item.to}>{item.title}</Link>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      <Pagination
        style={{
          margin: '2rem 1rem 2rem 0',
          textAlign: 'right',
        }}
        defaultPageSize={20}
        pageSizeOptions={['20', '25', '30']}
        showSizeChanger={true}
        locale={{ items_per_page: '' }}
        total={1005}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
        }}
        itemRender={(current, type, originalElement) => {
          if (type === 'page' && current === currentPage) {
            // return customized active pagination item
            return (
              <div
                style={{
                  backgroundColor: TERTIARY_BG_COLOR,
                  borderRadius: '.4rem',
                }}
              >
                {current}
              </div>
            );
          }
          return originalElement;
        }}
      ></Pagination>
    </div>
  );
}

export default ThreadList;
