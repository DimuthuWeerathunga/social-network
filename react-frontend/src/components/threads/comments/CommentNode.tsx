import React, { useEffect, useState } from 'react';
import { Avatar, Button } from 'antd';
import { Comment } from '@ant-design/compatible';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import IconText from '../../shared/IconText';
import ReplyEditor from './ReplyEditor';

import './CommentNode.css';
import { SECONDARY_BG_COLOR } from '../../../global-settings/colors';
import commentsList from './CommentListData';

interface CommentNodeProps {
  commentId: string;
  content: string;
}

const CommentNode: React.FC<CommentNodeProps> = ({ commentId, content }) => {
  const [childComments, setChildComments] = useState<CommentNodeProps[]>([]);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyBoxContent, setReplyBoxContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    const commentTimeout = setTimeout(() => {
      setChildComments(
        commentsList.filter((comment) => comment.parentId === commentId)
      );
    }, 2000);
    return () => {
      clearTimeout(commentTimeout);
    };
  }, [commentId]);

  const onReplyToClicked = () => {
    setShowReplyBox((prevShowReplyBox) => !prevShowReplyBox);
  };

  const onReplyBoxContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyBoxContent(event.target.value);
  };

  const onReplySubmit = () => {
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
  };

  return (
    <Comment
      style={{ backgroundColor: SECONDARY_BG_COLOR }}
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
          type='ghost'
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
};

export default CommentNode;
