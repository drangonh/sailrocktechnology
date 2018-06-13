import {Layout, Button, Table, Popconfirm, message} from 'antd';
import React, {Component} from 'react';
import {fetchGet, fetchPost} from "../../client";
import {typeCol} from "../DataSource";
import ThrModal from "../modal/ThrModal";

const {Content} = Layout;
let allListArr = [];
export default class ThrContent extends Component {
    componentDidMount() {
        this.getOneList();
        this.getType();
    }

    state = {
        col: typeCol,
        data: [],
        editOne: false,
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
        const res = await fetchGet("/shop/manager/second_category/get_all", "/1/100000");
        if (res.status && res.data.data.length != 0) {
            const arr = res.data.data;
            let data = [];
            arr.map((item, index) => {
                data.push({
                    key: index + 1,
                    num: index + 1,
                    name: item.csname
                })
            });
            allListArr = arr;
            this.setState({
                data: data
            })
        }
    }

    async getType() {
        const res = await fetchGet("/shop/manager/get_all", "/1/100000");
        if (res.status && res.data.data.length != 0) {
            const arr = res.data.data;
            this.typeArr = arr;
        }
    }

    /*一级分类*/
    cancleOne(name) {
        this.modalName = name

        if (name == "编辑") {
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

    /*增加分类*/
    async addType(param) {
        if (param.cname == "") {
            message.info("请输入分类名称！");
            this.setState({
                editOne: !this.state.editOne,
            })
            return
        }
        const res = await fetchPost("/shop/manager/add", JSON.stringify(param));
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
            let res = await fetchGet("/shop/manager/delete", "/" + allListArr[id - 1].cid + "");
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
            "cname": name.cname,
            "cid": allListArr[id - 1].cid,
            "discount": 0,
            "privilegetime": "2018-6-12",
            "tcid": 0,
        };

        let res = await fetchPost("/shop/manager/update", JSON.stringify(param));
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

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const id = selectedRowKeys[0];
        return (
            <Content style={{margin: '0 16px', position: "relative"}}>
                {/*一级modal*/}
                <ThrModal
                    oneType={this.typeArr}
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
                                this.cancleOne("编辑")
                            }}
                            type="primary"
                            htmlType="submit"
                            style={{
                                width: '80px',
                                height: "30px",
                                marginLeft: "20px"
                            }}
                        >
                            编辑
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