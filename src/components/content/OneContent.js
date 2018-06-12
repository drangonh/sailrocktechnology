import {Layout, Button, Table} from 'antd';
import React, {Component} from 'react';
import {fetchGet, fetchPost} from "../../client";
import {typeCol} from "../DataSource";

const {Content} = Layout;
let allListArr = [];
export default class OneContent extends Component {
    componentDidMount() {
        this.getOneList();
    }

    state = {
        col: typeCol,
        data: [],
    };

    editIcon = <Button onClick={() => {
        this.props.cancelEdit("")
    }} icon="edit"/>
    deleteIcon = <Button icon="delete"/>

    /*获取一级分类列表*/

    /*列表数据处理*/
    async getOneList() {
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
            this.setState({
                data: data
            })
        }
    }

    render() {
        return (
            <Content style={{margin: '0 16px', position: "relative"}}>
                <Button
                    onClick={() => {
                        this.props.cancelEdit("新增")
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