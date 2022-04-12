import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { PageHeader } from 'antd';

import UpdateThreadForm from '../components/threads/UpdateThreadForm';

function AddNewThreadPage() {
  const routes = [
    {
      path: '',
      breadcrumbName: 'Home',
    },
    {
      path: 'topics',
      breadcrumbName: 'Topics',
    },
    {
      path: 'new-thread',
      breadcrumbName: 'New Thread',
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
            routes,
            itemRender: function itemRender(route, params, routes, paths) {
              console.log(paths);
              const last = routes.indexOf(route) === routes.length - 1;
              return last ? (
                <span>{route.breadcrumbName}</span>
              ) : (
                <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
              );
            },
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
