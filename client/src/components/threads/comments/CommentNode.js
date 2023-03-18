import React, { useEffect, useState } from 'react';
import { Avatar, Button } from 'antd';
import { Comment } from '@ant-design/compatible';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import IconText from '../../shared/IconText';
import commentsList from './CommentListData';
import ReplyEditor from './ReplyEditor';

import './CommentNode.css';

function CommentNode({ commentId, content }) {
  const [childComments, setChildComments] = useState([]);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyBoxContent, setReplyBoxContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    let commentTimout = setTimeout(() => {
      setChildComments(
        commentsList.filter((comment) => comment.parentId === commentId)
      );
    }, 2000);
    return () => {
      clearTimeout(commentTimout);
    };
  }, [commentId]);

  function onReplyToClicked() {
    setShowReplyBox((prevShowReplyBox) => !prevShowReplyBox);
  }

  function onReplyBoxContentChange(event) {
    setReplyBoxContent(event.target.value);
  }

  function onReplySubmit() {
    if (!replyBoxContent) {
      console.log('empty comments are not allowed');
      return;
    }
    setSubmittingReply(true);

    const newComment = {
      parentId: commentId,
      commentId: 'somethingUnique',
      content: replyBoxContent,
    };

    setTimeout(() => {
      commentsList.push(newComment);
      setChildComments((prevChildComments) => {
        prevChildComments.unshift(newComment);
        return prevChildComments;
      });
      setSubmittingReply(false);
      setShowReplyBox(false);
    }, 2000);
  }

  return (
    <Comment
      actions={[
        <Button
          size='small'
          style={{ marginRight: '.5rem' }}
          key='comment-nested-reply-to'
          onClick={onReplyToClicked}
        >
          Reply to
        </Button>,
        <IconText
          icon={LikeOutlined}
          text='156'
          key='list-vertical-like-o'
          haveButton
          type='primary'
          size='small'
          style={{ marginRight: '.5rem' }}
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
      author={<span>Han Solo</span>}
      avatar={
        <Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />
      }
      content={<p>{content}</p>}
    >
      {showReplyBox && (
        <ReplyEditor
          onChange={onReplyBoxContentChange}
          onSubmit={onReplySubmit}
          submitting={submittingReply}
        />
      )}
      {childComments.map((comment) => (
        <CommentNode
          key={comment.commentId}
          commentId={comment.commentId}
          content={comment.content}
        />
      ))}
    </Comment>
  );
}

export default CommentNode;
