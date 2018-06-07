import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import logo from '../logo.svg';
import '../style/Navi.css'
import '../style/view.css'

const {Header, Content, Sider,Footer} = Layout;

class Navi extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout className="App">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="bars"/>
                            <span className="nav-text">菜单分类</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <span className="nav-text">一级分类</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <span className="nav-text">二级分类</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <span className="nav-text">三级分类</span>
                        </Menu.Item>

                        <Menu.Item key="5">
                            <span className="nav-text">四级分类</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#000', padding: 0}}>
                        <span style={{color: '#fff', paddingLeft: '2%', fontSize: '1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color: '#fff', paddingLeft: '2%', fontSize: '1.4em'}}>上海帆岩信息科技有限公司</span>
                        <span style={{color: '#fff', float: 'right', paddingRight: '1%'}}>
                            <img src={logo} className="App-logo" alt="logo"/>
                        </span>
                    </Header>
                    <Content style={{margin: '0 16px', position: "relative"}}>
                        <Breadcrumb style={{margin: '12px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="App" style={{padding: 24, background: '#fff', marginTop: "16px"}}>

                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        {new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + "-" + new Date().toLocaleTimeString()}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Navi;