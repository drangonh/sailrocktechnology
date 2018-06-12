import {Layout, Button, Table} from 'antd';
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
        editOne: false
    };
    modalName = "编辑";

    editIcon = <Button onClick={() => {
        this.cancelEdit("")
    }} icon="edit"/>
    deleteIcon = <Button icon="delete"/>

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
                    name: item.tcname,
                    edit: this.editIcon,
                    delete: this.deleteIcon,
                })
            });
            allListArr = data;
            this.setState({
                data: data
            })
        }
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

    /*增加分类*/
    async addType(param) {
        const res = await fetchPost("/shop/manager/top_category/add", JSON.stringify(param));
        if (res.status) {
            allListArr = allListArr.concat([{
                key: this.state.data.length + 1,
                num: this.state.data.length + 1,
                name: param.tcname,
                edit: this.editIcon,
                delete: this.deleteIcon,
            }]);
            this.setState({
                editOne: !this.state.editOne,
                data: allListArr
            })
        }

    }

    render() {
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
                    onOk={(param) => this.addType(param)}
                />

                <Button
                    onClick={() => {
                        this.cancleOne("新增")
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

                    <Table rowKey={(info) => {
                        console.log(info)
                    }} dataSource={this.state.data} columns={this.state.col} scroll={{y: 500}}/>
                </div>
            </Content>
        )
    }
}