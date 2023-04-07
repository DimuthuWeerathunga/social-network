import React from 'react';
import { PageHeader } from '@ant-design/pro-layout';

import { Link, useParams } from 'react-router-dom';
import ThreadContent from '../components/threads/ThreadContent';
import CommentsSection from '../components/threads/comments/CommentsSection';
import { PRIMARY_TEXT_COLOR } from '../global-settings/colors';

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
        title={
          <h2 style={{ color: PRIMARY_TEXT_COLOR }}>
            This is the thread title this should be long and handsome
          </h2>
        }
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
