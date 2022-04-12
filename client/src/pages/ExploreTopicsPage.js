import React from 'react';
import { Col, Row, Tabs } from 'antd';
import TopicsList from '../components/topics/TopicsList';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function ExploreTopicsPage() {
  return (
    <Row style={{ padding: '2rem', justifyContent: 'center' }}>
      <Col span={20}>
        <Tabs defaultActiveKey='1' onChange={callback}>
          <TabPane tab='Latest' key='latest-topics'>
            <TopicsList latestTopicList />
          </TabPane>
          <TabPane tab='Trending' key='trending-topics'>
            <TopicsList trendigTopicsList />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
}

export default ExploreTopicsPage;
