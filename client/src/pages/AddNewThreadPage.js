import { Col, Row } from 'antd';
import React from 'react';

import UpdateThreadForm from '../components/threads/UpdateThreadForm';

function AddNewThreadPage() {
  return (
    <Row>
      <Col
        span={24}
        style={{ marginTop: '2rem', paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        <UpdateThreadForm />
      </Col>
    </Row>
  );
}

export default AddNewThreadPage;
