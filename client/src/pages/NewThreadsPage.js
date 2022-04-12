import React from 'react';

import ThreadList from '../components/threads/ThreadList';

const listData = [];
for (let i = 0; i < 20; i++) {
  listData.push({
    to: '/categories/thread/fgeirbgrei9',
    title: `Ant design part ${i + 1}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'We supply a series of design principles, practical patterns and high quality',

    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

function NewThreadsPage() {
  return <ThreadList listData={listData}></ThreadList>;
}

export default NewThreadsPage;
