import React from 'react'
import {Popconfirm} from "antd"
import ReactDOM from 'react-dom'

const BaseUrl = "http://www.smarticloudnet.com";

export const typeCol = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width: 100
}, {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name', width: 100
}];


export const goodsCol = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width: 100
}, {
    title: '商品图片',
    dataIndex: 'picture',
    key: 'picture',
    width: 100,
    render: (obj, row, index) => {
        return (
            <div style={{width: "100px", height: "100px"}}>
                <img style={{width: "100%", height: "100%"}} src={BaseUrl + "/" + obj.img} alt={obj.des}/>
            </div>
        )
    }
}, {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    width: 100
}, {
    title: '商品价格',
    dataIndex: 'price',
    key: 'price',
    width: 100
}, {
    title: '库存量',
    dataIndex: 'storage',
    key: 'storage',
    width: 100
}, {
    title: '是否热门',
    dataIndex: 'isHot',
    key: 'isHot',
    width: 100
}];