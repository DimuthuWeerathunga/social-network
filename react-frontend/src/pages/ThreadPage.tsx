import React, { FC } from 'react';
import { PageHeader } from '@ant-design/pro-layout';

import { Link, useParams } from 'react-router-dom';
import ThreadContent from '../components/threads/ThreadContent';
import CommentsSection from '../components/threads/comments/CommentsSection';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { PRIMARY_TEXT_COLOR } from '../global-settings/colors';

const ThreadPage: FC = () => {
  const { threadId } = useParams();
  console.log(threadId);


  const breadcrumbItems = [
    {
      path: undefined,
      title: 'Home'
    },
    {
      path: 'categories',
      title: 'Categories'
    },
    {
      path: 'thread',
      title: 'Thread'
    }
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
          src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
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
      <ThreadContent />
      <CommentsSection parentPostId='a' />
    </>
  );
};

export default ThreadPage;
