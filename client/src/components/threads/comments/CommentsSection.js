import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CommentNode from './CommentNode';

import commentsList from './CommentListData';

function CommentsSection({ parentPostId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let commentTimout = setTimeout(() => {
      setComments(
        commentsList.filter((comment) => comment.parentId === parentPostId)
      );
    }, 2000);
    return () => {
      clearTimeout(commentTimout);
    };
  }, [parentPostId]);

  return (
    <Row style={{ marginTop: '2rem' }}>
      <Col span={21} offset={2}>
        {comments.map((comment) => (
          <CommentNode
            key={comment.commentId}
            content={comment.content}
            commentId={comment.commentId}
          ></CommentNode>
        ))}
      </Col>
    </Row>
  );
}

export default CommentsSection;
