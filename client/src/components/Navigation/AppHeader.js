import React from 'react';
import { useContext } from 'react';
import { Menu, Row, Col } from 'antd';
import { Layout, Input } from 'antd';
import {
    UnorderedListOutlined,
    RiseOutlined,
    CaretUpOutlined,
    DribbbleOutlined,
    LoginOutlined,
    UserAddOutlined,
    HomeOutlined, UserOutlined
} from '@ant-design/icons';

import { NavigationContext } from '../../context/navigation-context';
import { PRIMARY_BG_COLOR, TERTIARY_BG_COLOR } from '../../global-settings/colors';
import { AuthContext } from '../../context/authentication-context';

const {
    Header
    // Footer,
    // Content
} = Layout;
const { Search } = Input;

// const { SubMenu } = Menu;

function AppHeader() {
    const navigation = useContext(NavigationContext);
    const auth = useContext(AuthContext);

    const onSearch = (value) => console.log(value);

    const handleNavClick = (e) => {
        navigation.handleNavClick(e);
        if (e.key === 'logout') {
            auth.onLogout();
        }
    };

    return (
        <>
            <Header
                style={{
                    backgroundColor: PRIMARY_BG_COLOR
                }}
            >
                <Row>
                    <Col
                        span={14}
                        offset={1}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Search
                            placeholder='search here'
                            allowClear
                            enterButton='Search'
                            size='large'
                            onSearch={onSearch}
                            style={{
                                backgroundColor: TERTIARY_BG_COLOR
                            }}
                        />
                    </Col>
                    <Col
                        span={8}
                        offset={1}
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Menu
                            style={{ width: '100%', backgroundColor: PRIMARY_BG_COLOR }}
                            onClick={handleNavClick}
                            selectedKeys={[navigation.currentlyActiveNav]}
                            mode='horizontal'
                        >
                            {!auth.isLoggedIn && <><Menu.Item key='login' icon={<LoginOutlined />}>
                                Login
                            </Menu.Item>
                                <Menu.Item key='signup' icon={<UserAddOutlined />}>
                                    SingUp
                                </Menu.Item></>}
                            {auth.isLoggedIn && <Menu.Item key='logout' icon={<UserOutlined />}>
                                Log Out
                            </Menu.Item>}
                        </Menu>
                    </Col>
                </Row>
            </Header>
            <Header
                style={{
                    backgroundColor: PRIMARY_BG_COLOR,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Menu
                    style={{ width: '100%', backgroundColor: PRIMARY_BG_COLOR }}
                    onClick={navigation.handleNavClick}
                    selectedKeys={[navigation.currentlyActiveNav]}
                    mode='horizontal'
                    theme='light'
                >
                    <Menu.Item
                        key='home'
                        icon={<HomeOutlined />}
                        style={{ marginLeft: 'auto' }}
                    >
                        HOME
                    </Menu.Item>
                    <Menu.Item key='trending' icon={<RiseOutlined />}>
                        TRENDING
                    </Menu.Item>
                    <Menu.Item key='new' icon={<CaretUpOutlined />}>
                        NEW
                    </Menu.Item>
                    <Menu.Item key='topics' icon={<UnorderedListOutlined />}>
                        Explore Topics
                    </Menu.Item>
                    <Menu.Item
                        key='free-ads'
                        icon={<DribbbleOutlined />}
                        style={{ marginRight: 'auto' }}
                    >
                        FREE ADS
                    </Menu.Item>
                </Menu>
            </Header>
        </>
    );
}

export default AppHeader;
