import React from 'react'
import {Popconfirm} from "antd"
import ReactDOM from 'react-dom'

export const typeCol = [{
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width: 100
}, {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name', width: 100
}, {
    title: '编辑',
    dataIndex: 'edit',
    key: 'address', width: 100
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
    render: (text, row, index) => {
        return (
            <div style={{width: "100px", height: "100px"}}>
                <img style={{width: "100%", height: "100%"}} src={text} alt="上海鲜花港 - 郁金香"/>
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
}, {
    title: '编辑',
    dataIndex: 'edit',
    key: 'edit',
    width: 100
}, {
    title: '删除',
    dataIndex: 'delete',
    key: 'delete',
    width: 100,
    render: (text, record, index) => {
        return (
            <Popconfirm title="确定删除？" onConfirm={(record) => console.log(record)}>
                <a href="#">删除</a>
            </Popconfirm>
        )
    }
}];

export const goods = [{
    key: '1',
    num: '1',
    picture: "https://hiphotos.baidu.com/feed/pic/item/95eef01f3a292df52138538ab0315c6035a873b2.jpg",
    name: "商品",
    price: "1元",
    storage: "5",
    isHot: "是",
    edit: "编辑",
    delete: "删除"
}, {
    key: '2',
    num: '2',
    picture: "https://t12.baidu.com/it/u=1751174237,2243582158&fm=173&app=25&f=JPEG?w=218&h=146&s=F2232AE34AA0D6CA12988C14030050DB",
    name: "商品",
    price: "1元",
    storage: "5",
    isHot: "是",
    edit: "编辑",
    delete: "删除"
}];