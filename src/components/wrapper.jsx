import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


class Wrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
        this.selectView = this.selectView.bind(this);
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    selectView(view) {
        this.props.history.push('/' + view.key);
    }

    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    // collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}

                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <div className="logo">Chain GUI</div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} onClick={this.selectView}>
                        <Menu.Item key="home">
                            <Icon type="home" />
                            <span className="nav-text">首页</span>
                        </Menu.Item>
                        <Menu.Item key="blockList">
                            <Icon type="bar-chart" />
                            <span className="nav-text">区块列表</span>
                        </Menu.Item>
                        <Menu.Item key="peerList">
                            <Icon type="cloud-o" />
                            <span className="nav-text">节点列表</span>
                        </Menu.Item>
                        <Menu.Item key="createRecord">
                            <Icon type="message" />
                            <span className="nav-text">产生消息</span>
                        </Menu.Item>
                        <Menu.Item key="votePeer">
                            <Icon type="team" />
                            <span className="nav-text">节点选举</span>
                        </Menu.Item>
                        <Menu.Item key="dappList">
                            <Icon type="shop" />
                            <span className="nav-text">DAPP列表</span>
                        </Menu.Item>
                        <Menu.Item key="accountInfo">
                            <Icon type="user" />
                            <span className="nav-text">用户资料</span>
                        </Menu.Item>
                        {/* <Menu.Item key="7">
                            <Icon type="appstore-o" />
                            <span className="nav-text">待定</span>
                        </Menu.Item> */}
                    </Menu>
                </Sider>

                <Layout style={{ marginLeft: 200 }}>

                    <Header style={{ background: '#fff', padding: 0 }} />

                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                            {this.props.children}
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        Chain GUI ©2018 Created by Huangyifan
                    </Footer>

                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Wrapper);