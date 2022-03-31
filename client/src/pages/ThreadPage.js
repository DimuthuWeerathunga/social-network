import React, { useEffect, useRef, useState } from 'react';
import { PageHeader, Menu, Row, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ThreadContent from '../components/threads/ThreadContent';
import CommentsSection from '../components/threads/comments/CommentsSection';

function ThreadPage() {
  const routes = [
    {
      path: '',
      breadcrumbName: 'Home',
    },
    {
      path: 'categories',
      breadcrumbName: 'Categories',
    },
    {
      path: 'thread',
      breadcrumbName: 'Thread',
    },
  ];

  console.log('parent re render');

  return (
    <>
      <PageHeader
        title='This is the thread title this should be long and handsome'
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
      <ThreadContent />
      <CommentsSection parentPostId='a' />
    </>
  );
}

export default ThreadPage;
