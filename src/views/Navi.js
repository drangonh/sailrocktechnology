import {Layout, Menu, Breadcrumb, Icon, Table, Button, Modal, Form} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import logo from '../logo.svg';
import EditModal from '../components/EditModal';
import OneModal from '../components/modal/OneModal';
import '../style/Navi.css'
import '../style/view.css'
import {typeCol, goodsCol, goods} from "../components/DataSource"
import {fetchGet, fetchPost} from "../client"
import {getOneList} from "../http/data";
import OneContent from "../components/content/OneContent";

const {Header, Content, Sider, Footer} = Layout;
const SubMenu = Menu.SubMenu;
let allListArr = [];

class Navi extends Component {
    toggle = () => {
        // this.setState({
        //     collapsed: !this.state.collapsed,
        // });
    }

    editIcon = <Button onClick={() => {
        this.cancelEdit();
    }} icon="edit"/>
    deleteIcon = <Button icon="delete"/>

    dataSource = [];

    state = {
        collapsed: false,
        mode: 'inline',
        editVisible: false,
        editOne: false,
        editTwo: false,
        editTre: false,
        editGoods: false,
        col: typeCol,
        data: this.dataSource,
        key: 1
    };
    modalName = "编辑";
    editModal = Form.create()

    /*商品取消编辑*/
    cancelEdit(name) {
        if (name != "" && name) {
            this.modalName = name
        } else {
            this.modalName = "编辑";
        }

        this.setState({
            editVisible: !this.state.editVisible
        })
    }

    /*一级分类*/
    cancleOne(name) {
        if (name != "" && name) {
            this.modalName = name
        } else {
            this.modalName = "编辑";
        }

        this.setState({
            editOne: !this.state.editOne
        })
    }

    componentDidMount() {
    }

    /*获取一级分类列表*/

    /*列表数据处理*/
    async getList() {
        const res = await fetchGet("/shop/manager/top_category/get_all", "/1/10");
        console.log("11111111111");
        console.log(res);
        if (res.status && res.data.data.length != 0) {
            const arr = res.data.data;
            let data = [];
            arr.map((item, index) => {
                data.push({
                    key: index + 1,
                    num: index + 1,
                    name: item.tcname,
                    edit: this.editIcon,
                    delete: this.deleteIcon,
                })
            });
            allListArr.push(data);
            this.setState({
                data: data
            })
        }
    }

    /*获取二级分类列表*/
    async getTwoList() {
        const res = await fetchGet("/shop/manager/get_all", "/1/10");
        console.log("22222222222222");
        console.log(res);
        if (res.status && res.data.data.length != 0) {
            const arr = res.data.data;
            let data = [];
            arr.map((item, index) => {
                data.push({
                    key: index + 1,
                    num: index + 1,
                    name: item.tcname,
                    edit: this.editIcon,
                    delete: this.deleteIcon,
                })
            });
            allListArr.push(data);
        }

    }

    /*获取三级分类列表*/
    async getThreeList() {
        const res = await fetchGet("shop/manager/second_category/get_all", "/1/10");
        console.log("333333333333333");
        console.log(res);
        if (res.status && res.data.data.length != 0) {
            const arr = res.data.data;
            let data = [];
            arr.map((item, index) => {
                data.push({
                    key: index + 1,
                    num: index + 1,
                    name: item.tcname,
                    edit: this.editIcon,
                    delete: this.deleteIcon,
                })
            });
            allListArr.push(data);
        }
    }

    /*获取产品列表*/
    async getGoodsList() {
        const res = await fetchGet("shop/manager/product/get_all/1/10", "");
        console.log(res);
    }

    render() {
        return (
            <Layout className="App">

                {/*Modal*/}
                <EditModal
                    title={this.modalName}
                    visible={this.state.editVisible}
                    onCancel={() => this.cancelEdit()}
                    onOk={() => this.cancelEdit()}
                />

                {/*一级modal*/}
                <OneModal
                    title={this.modalName}
                    visible={this.state.editOne}
                    onCancel={() => this.cancleOne()}
                    onOk={() => this.cancleOne()}
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
                                    data: allListArr[item.key]
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
                    <OneContent cancelEdit={(name) => this.cancleOne(name)}/>
                    <Footer style={{textAlign: 'center'}}>
                        {new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()}&nbsp;&nbsp;&nbsp;&nbsp;{new Date().toLocaleTimeString()}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Navi;