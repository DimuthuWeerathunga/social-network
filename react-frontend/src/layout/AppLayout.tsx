import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';

import AppHeader from '../components/Navigation/AppHeader';
import AppLeftSider from '../components/sider/AppLeftSider';
import ActionButtonColumn from '../components/Navigation/ActionButtonColumn';
import {
    PRIMARY_BG_COLOR,
    PRIMARY_TEXT_COLOR,
    SECONDARY_BG_COLOR,
} from '../global-settings/colors';

import './AppLayout.css';

const { Sider, Content } = Layout;

const AppLayout = () => (
    <Layout
        style={{
            backgroundColor: PRIMARY_BG_COLOR,
            fontWeight: 600,
            color: PRIMARY_TEXT_COLOR,
            minHeight: '100vh',
        }}
    >
        <AppHeader></AppHeader>
        <Layout
            style={{
                backgroundColor: PRIMARY_BG_COLOR,
            }}
        >
            <Sider
                className='hide-on-small'
                style={{
                    overflow: 'auto',
                    height: '80vh',
                    backgroundColor: PRIMARY_BG_COLOR,
                }}
            >
                <AppLeftSider></AppLeftSider>
            </Sider>
            <Content
                style={{
                    overflow: 'auto',
                    backgroundColor: SECONDARY_BG_COLOR,
                    maxHeight: '87vh',
                    borderRadius: '2rem',
                }}
            >
                <Row
                    style={{
                        marginTop: '3rem',
                        marginBottom: '3rem',
                        minHeight: '60vh',
                    }}
                >
                    <Col
                        span={21}
                        offset={1}
                        style={{
                            backgroundColor: SECONDARY_BG_COLOR,
                            borderRadius: '2rem',
                        }}
                    >
                        <Outlet />
                    </Col>
                    <Col
                        span={2}
                        // style={{ position: 'relative' }}
                    >
                        <ActionButtonColumn></ActionButtonColumn>
                    </Col>
                </Row>
            </Content>
            <Sider
                className='hide-on-small'
                style={{
                    backgroundColor: PRIMARY_BG_COLOR,
                }}
            >
                {/* right sidebar */}
            </Sider>
        </Layout>
    </Layout>
);

export default AppLayout;
