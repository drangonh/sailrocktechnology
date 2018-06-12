import {Layout, Button, Table, Popconfirm, message} from 'antd';
import React, {Component} from 'react';
import {fetchGet, fetchPost} from "../../client";
import {typeCol} from "../DataSource";
import OneModal from "../modal/OneModal";

const {Content} = Layout;
let allListArr = [];
export default class OneContent extends Component {
    componentDidMount() {
        this.getOneList();
    }

    state = {
        col: typeCol,
        data: [],
        editOne: false,
        selectedRowKeys: []
    };
    modalName = "编辑";

    editIcon = <Button onClick={() => {
        this.cancleOne("")
    }} icon="edit"/>

    /*获取一级分类列表*/

    /*列表数据处理*/
    async getOneList() {
        const res = await fetchGet("/shop/manager/top_category/get_all", "/1/100000");
        if (res.status && res.data.data.length != 0) {
            const arr = res.data.data;
            let data = [];
            arr.map((item, index) => {
                data.push({
                    key: index + 1,
                    num: index + 1,
                    name: item.tcname
                })
            });
            allListArr = arr;
            this.setState({
                data: data
            })
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
        const res = await fetchPost("/shop/manager/top_category/add", JSON.stringify(param));
        if (res.status) {
            this.getOneList();
            this.setState({
                editOne: !this.state.editOne,
            })
        }

    }

    /*删除分类*/
    async deleteOne() {
        const {selectedRowKeys} = this.state;
        if (selectedRowKeys.length == 0) {
            message.info("请勾选要删除的项");
        } else if (selectedRowKeys.length == 1) {
            const id = selectedRowKeys[0];
            let res = await fetchGet("/shop/manager/top_category/delete", "/" + allListArr[id - 1].id + "");
            this.getOneList();
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
            "tcname": name.tcname,
            "id": allListArr[id - 1].id
        };

        let res = await fetchPost("/shop/manager/top_category/update", JSON.stringify(param));
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
                <OneModal
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
                    }}>一级分类</p>

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