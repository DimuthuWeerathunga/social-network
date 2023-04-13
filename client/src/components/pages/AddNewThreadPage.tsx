import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';

import UpdateThreadForm from '../components/threads/UpdateThreadForm';

const AddNewThreadPage: FC = () => {

  const breadcrumbItems = [
    {
      path: undefined,
      title: 'Home',
    },
    {
      path: 'topics',
      title: 'Topics',
    },
    {
      path: 'new-thread',
      title: 'New Thread',
    },
  ];

  return (
      <Row>
        <Col span={22} offset={1} style={{ padding: '3rem 2rem 0 2rem' }}>
          <PageHeader
              title='Create a new post'
              className='thread-page-header'
              avatar={{
                src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
              }}
              breadcrumb={{
                items: breadcrumbItems,
                itemRender: (route: ItemType, params: any, routes: ItemType[], paths: string[]) => {
                  const last = routes.indexOf(route) === routes.length - 1;
                  console.log(`/${paths.join('/')}`);
                  return last ? (
                    <span>{'title' in route ? route.title : 'TitleUnavailable'}</span>
                  ) : (
                    <Link to={`/${paths.join('/')}`}>{'title' in route ? route.title : 'TitleUnavailable'}</Link>
                  );
                }
              }}
          ></PageHeader>
        </Col>
        <Col span={24} style={{ padding: '2rem' }}>
          <UpdateThreadForm />
        </Col>
      </Row>
  );
}

export default AddNewThreadPage;
