import React from 'react';
import { Row, Col } from 'antd';
import CommentNode from './CommentNode';

import commentsList from './CommentListData';

function CommentsSection({ parentPostId }) {
  return (
    <Row style={{ marginTop: '2rem', backgroundColor: '#f8f8f8' }}>
      <Col span={21} offset={2}>
        {commentsList
          .filter((comment) => comment.parentId === parentPostId)
          .map((comment) => (
            <CommentNode
              key={comment.commentNodeId}
              content={comment.content}
              commentNodeId={comment.commentNodeId}
            ></CommentNode>
          ))}
      </Col>
    </Row>
  );
}

export default CommentsSection;
