import React from 'react';
import { PageHeader } from 'antd';

import { Link, useParams } from 'react-router-dom';
import ThreadContent from '../components/threads/ThreadContent';
import CommentsSection from '../components/threads/comments/CommentsSection';

function ThreadPage() {
  const { threadId } = useParams();
  console.log(threadId);

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
