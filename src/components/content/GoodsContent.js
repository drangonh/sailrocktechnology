import {Layout, Button, Table, Popconfirm, message} from 'antd';
import React, {Component} from 'react';
import {fetchGet, fetchPost, fetchPostFormData} from "../../client";
import {goodsCol} from "../DataSource";
import EditModal from "../modal/EditModal";
import EditImg from "../modal/EditImg";

const {Content} = Layout;
let allListArr = [];
export default class OneContent extends Component {
    componentDidMount() {
        this.getOneList();
        this.getType();
    }

    state = {
        col: goodsCol,
        data: [],
        editOne: false,
        editImg: false,
        selectedRowKeys: []
    };
    modalName = "编辑";
    typeArr = [];
    editIcon = <Button onClick={() => {
        this.cancleOne("")
    }} icon="edit"/>

    /*获取一级分类列表*/

    /*列表数据处理*/
    async getOneList() {
        const res = await fetchGet("/shop/manager/product/get_all", "/1/100000");
        if (res.status && res.data.data.length != 0) {
            const arr = res.data.data;
            let data = [];
            arr.map((item, index) => {
                data.push({
                    key: index + 1,
                    num: index + 1,
                    picture: {
                        img: item.image,
                        des: item.pdesc
                    },
                    name: item.pname,
                    price: item.shopPrice,
                    storage: item.inventory,
                    isHot: !item.isHot || item.isHot == "否" ? "否" : "是",
                })
            });
            allListArr = arr;
            this.setState({
                data: data
            })
        }
    }

    async getType() {
        const res = await fetchGet("/shop/manager/second_category/get_all", "/1/100000");
        if (res.status && res.data.data.length != 0) {
            const arr = res.data.data;
            this.typeArr = arr;
        }
    }

    /*一级分类*/
    cancleOne(name) {
        this.modalName = name

        if (name.indexOf("编辑") != -1) {
            const {selectedRowKeys} = this.state;
            if (selectedRowKeys.length == 0) {
                message.info("请勾选要修改的项");
                return
            } else if (selectedRowKeys.length == 1) {

            } else {
                message.info("每次只能修改一项！");
                return
            }
        }
        this.setState({
            editOne: !this.state.editOne
        })
    }

    editIMG() {
        const {selectedRowKeys} = this.state;
        if (selectedRowKeys.length == 0) {
            message.info("请勾选要修改的项");
            return
        } else if (selectedRowKeys.length == 1) {

        } else {
            message.info("每次只能修改一项！");
            return
        }
        this.setState({
            editImg: !this.state.editImg
        })
    }

    /*增加分类*/
    async addType(param) {
        if (param.cname == "") {
            message.info("请输入分类名称！");
            this.setState({
                editOne: !this.state.editOne,
            })
            return
        }
        const res = await fetchPostFormData("/shop/manager/product/add", JSON.stringify(param));
        if (res.status) {
            this.getOneList();
        } else {
            message.info("新增失败！");
        }
        this.setState({
            editOne: !this.state.editOne,
        })
    }

    /*删除分类*/
    async deleteOne() {
        const {selectedRowKeys} = this.state;
        if (selectedRowKeys.length == 0) {
            message.info("请勾选要删除的项");
        } else if (selectedRowKeys.length == 1) {
            const id = selectedRowKeys[0];
            let res = await fetchGet("/shop/manager/product/delete", "/" + allListArr[id - 1].pid + "");
            if (res.status) {
                this.getOneList();
            } else {
                message.info("删除失败！");
            }

            this.setState({
                selectedRowKeys: []
            })
        } else {
            message.info("只能删除一项,防止误删！");
        }

    }

    /*编辑分类*/
    async editType(name) {
        const {selectedRowKeys} = this.state;
        const id = selectedRowKeys[0];
        const param = {
            "pid": name.pid,
            "pname": name.pname,
            "marketPrice": name.marketPrice,
            "shopPrice": name.shopPrice,
            "inventory": name.inventory,
            "pdesc": name.pdesc,
            "isHot": name.isHot,
            "pdate": name.pdate,
            "csid": name.csid,
        };
        let res = await fetchPost("/shop/manager/product/update", JSON.stringify(param));
        this.getOneList();
        this.setState({
            selectedRowKeys: [],
            editOne: !this.state.editOne
        })
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    confirm() {
        message.info('Click on Yes.');
    }

    /*编辑图片*/
    uploadImg() {
        this.setState({
            editImg: !this.state.editImg
        })
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const id = selectedRowKeys.length != 0 ? selectedRowKeys[0] : null;
        return (
            <Content style={{margin: '0 16px', position: "relative"}}>
                {/*一级modal*/}
                <EditModal
                    oneType={this.typeArr}
                    oneList={id ? allListArr[id - 1] : {}}
                    title={this.modalName}
                    visible={this.state.editOne}
                    onCancel={() => {
                        this.setState({
                            editOne: !this.state.editOne
                        })
                    }}
                    value={allListArr[id - 1]}
                    onOk={(param) => this.modalName == "新增" ? this.addType(param) : this.editType(param)}
                />

                <EditImg
                    img={id ? allListArr[id - 1].image : ""}
                    title={"编辑图片"}
                    visible={this.state.editImg}
                    onCancel={() => {
                        this.setState({
                            editImg: !this.state.editImg
                        })
                    }}
                    onOk={(param) => this.uploadImg()}
                />

                <div style={{padding: 24, background: '#fff', marginTop: "16px"}}>
                    <p style={{
                        width: "100%",
                        backgroundColor: "#CCC",
                        textAlign: "center",
                        lineHeight: "50px",
                        height: "50px",
                        fontSize: "medium",
                        fontWeight: "bold"
                    }}>二级分类</p>

                    <div style={{display: "flex", flexDirection: "row", marginBottom: "16px"}}>
                        <Button
                            onClick={() => {
                                this.cancleOne("新增")
                            }}
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '80px',
                                height: "30px",
                            }}
                        >
                            新增
                        </Button>

                        <Popconfirm
                            placement="left"
                            title={"该项将会被重新编辑，请确认!"}
                            onConfirm={() => this.deleteOne()}
                            okText="确定"
                            cancelText="取消">
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    width: '80px',
                                    height: "30px",
                                    marginLeft: "20px"
                                }}
                            >
                                删除
                            </Button>
                        </Popconfirm>


                        <Button
                            onClick={() => {
                                this.cancleOne("编辑内容")
                            }}
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '80px',
                                height: "30px",
                                marginLeft: "20px"
                            }}
                        >
                            编辑内容
                        </Button>

                        <Button
                            onClick={() => {
                                this.editIMG()
                            }}
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '80px',
                                height: "30px",
                                marginLeft: "20px"
                            }}
                        >
                            编辑图片
                        </Button>
                    </div>

                    <Table
                        rowSelection={rowSelection}
                        dataSource={this.state.data}
                        columns={this.state.col}
                        scroll={{y: 500}}
                    />
                </div>
            </Content>
        )
    }
}