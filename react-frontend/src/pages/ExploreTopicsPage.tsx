import React, { FC } from 'react';
import { Col, Row, Tabs } from 'antd';
import TopicsList from '../components/topics/TopicsList';

const { TabPane } = Tabs;

const callback = (key: string) => {
  console.log(key);
};

const ExploreTopicsPage: FC = () => {
  return (
    <Row style={{ padding: '2rem', justifyContent: 'center' }}>
      <Col span={20}>
        <Tabs defaultActiveKey='1' onChange={callback}>
          <TabPane tab='Latest' key='latest-topics'>
            <TopicsList />
          </TabPane>
          <TabPane tab='Trending' key='trending-topics'>
            <TopicsList />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ExploreTopicsPage;
