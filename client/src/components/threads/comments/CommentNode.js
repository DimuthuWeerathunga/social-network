import React from 'react';
import { Comment, Avatar } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import IconText from '../../shared/IconText';
import commentsList from './CommentListData';

function CommentNode({ commentNodeId, content }) {
  return (
    <Comment
      actions={[
        <span key='comment-nested-reply-to'>Reply to</span>,
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
          ghost
          size='small'
        />,
      ]}
      author={<a>Han Solo</a>}
      avatar={
        <Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />
      }
      content={<p>{content}</p>}
    >
      {commentsList
        .filter((comment) => comment.parentId === commentNodeId)
        .map((comment) => (
          <CommentNode
            key={comment.commentNodeId}
            commentNodeId={comment.commentNodeId}
            content={comment.content}
          />
        ))}
    </Comment>
  );
}

export default CommentNode;
