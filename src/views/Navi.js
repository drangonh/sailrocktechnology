import {Layout, Menu, Breadcrumb, Icon, Table, Button, Modal, Form} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import logo from '../logo.svg';
import EditModal from '../components/modal/EditModal';
import OneModal from '../components/modal/OneModal';
import '../style/Navi.css'
import '../style/view.css'
import {typeCol, goodsCol, goods} from "../components/DataSource"
import {fetchGet, fetchPost} from "../client"
import {getOneList} from "../http/data";
import OneContent from "../components/content/OneContent";
import TwoContent from "../components/content/TwoContent";
import ThrContent from "../components/content/ThrContent";
import GoodsContent from "../components/content/GoodsContent";

const {Header, Content, Sider, Footer} = Layout;
const SubMenu = Menu.SubMenu;

/*记录所有的分类数据*/
let allListArr = [];

class Navi extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        key: 1
    };
    modalName = "编辑";
    editModal = Form.create()

    componentDidMount() {
    }

    getAllData(obj) {
        allListArr.push(obj);
    }

    render() {
        return (
            <Layout className="App">

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
                            this.setState({
                                key: item.key
                            })
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
                            {/* <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="3">分类列表</Menu.Item>
                            </SubMenu>*/}
                        </SubMenu>

                        <SubMenu key="sub3" title={<span><Icon type="appstore"/><span>三级分类</span></span>}>
                            <Menu.Item key="3">分类列表</Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub4" title={<span><Icon type="appstore"/><span>产品管理</span></span>}>
                            <Menu.Item key="4">产品列表</Menu.Item>
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
                    {
                        this.state.key == 1 ?
                            <OneContent getAllData={(arr) => this.getAllData(arr)}/> :
                            null
                    }

                    {
                        this.state.key == 2 ?
                            <TwoContent oneType={allListArr[0]} getAllData={(arr) => this.getAllData(arr)}/>
                            :
                            null
                    }

                    {
                        this.state.key == 3 ?
                            <ThrContent oneType={allListArr[0]} getAllData={(arr) => this.getAllData(arr)}/>
                            :
                            null
                    }

                    {
                        this.state.key == 4 ?
                            <GoodsContent oneType={allListArr[0]} getAllData={(arr) => this.getAllData(arr)}/>
                            :
                            null
                    }

                    <Footer style={{textAlign: 'center'}}>
                        {new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()}
                        &nbsp;&nbsp;&nbsp;&nbsp;{new Date().toLocaleTimeString()}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Navi;