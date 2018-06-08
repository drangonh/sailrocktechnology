import {Layout, Menu, Breadcrumb, Icon, Table, Button, Modal, Form} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import logo from '../logo.svg';
import EditModal from '../components/EditModal';
import '../style/Navi.css'
import '../style/view.css'
import {typeCol, goodsCol, goods} from "../components/DataSource"

const {Header, Content, Sider, Footer} = Layout;
const SubMenu = Menu.SubMenu;

class Navi extends Component {
    toggle = () => {
        // this.setState({
        //     collapsed: !this.state.collapsed,
        // });
    }

    editIcon = <Button onClick={() => {
        this.setState({
            editVisible: !this.state.editVisible
        })
    }} icon="edit"/>
    deleteIcon = <Button icon="delete"/>

    dataSource = [{
        key: '1',
        num: '1',
        name: "咖啡豆",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '2',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '3',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '4',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '5',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '6',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '7',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '8',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '9',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '10',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '11',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '12',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '13',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '14',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '15',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }, {
        key: '16',
        num: '2',
        name: "111",
        edit: this.editIcon,
        delete: this.deleteIcon,
    }];

    state = {
        collapsed: false,
        mode: 'inline',
        editVisible: false,
        col: typeCol,
        data: this.dataSource,
        key: 1
    };

    editModal = Form.create()

    /*取消编辑*/
    cancelEdit() {
        this.setState({
            editVisible: !this.state.editVisible
        })
    }

    render() {
        return (
            <Layout className="App">

                {/*Modal*/}
                <EditModal
                    visible={this.state.editVisible}
                    onCancel={() => this.cancelEdit()}
                    onOk={() => this.cancelEdit()}
                />

                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" style={{verticalAlign: "center"}}>
                        <p style={{textAlign: "center", color: "red", height: "100%", lineHeight: "32px"}}>登录用户：黄龙</p>
                    </div>

                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}
                        onSelect={(item) => {
                            if (item.key == 4) {
                                this.setState({
                                    col: goodsCol,
                                    data: goods
                                })
                            } else {
                                this.setState({
                                    col: typeCol,
                                    data: this.dataSource
                                })
                            }
                        }}
                    >
                        <Menu.Item key="0">
                            <Icon type="pie-chart"/>
                            <span>菜单分类</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="appstore"/><span>一级分类</span></span>}>
                            <Menu.Item key="1">分类列表</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>二级分类</span></span>}>
                            <Menu.Item key="2">分类列表</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="3">分类列表</Menu.Item>
                            </SubMenu>
                        </SubMenu>

                        <SubMenu key="sub3" title={<span><Icon type="appstore"/><span>三级分类</span></span>}>
                            <Menu.Item key="4">商品列表</Menu.Item>
                        </SubMenu>
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
                        <Button
                            onClick={() => {

                            }}
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '80px',
                                position: "absolute",
                                right: "50px",
                                top: "50px",
                                height: "30px",
                            }}
                        >
                            新增
                        </Button>

                        <div style={{padding: 24, background: '#fff', marginTop: "16px"}}>
                            <p style={{
                                width: "100%",
                                backgroundColor: "#CCC",
                                textAlign: "center",
                                lineHeight: "50px",
                                height: "50px",
                                fontSize: "medium",
                                fontWeight: "bold"
                            }}>一级分类</p>

                            <Table dataSource={this.state.data} columns={this.state.col} scroll={{y: 500}}/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        {new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()}&nbsp;&nbsp;&nbsp;&nbsp;{new Date().toLocaleTimeString()}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Navi;