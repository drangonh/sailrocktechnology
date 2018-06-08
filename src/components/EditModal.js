import {Icon, Form, Input,Modal} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import logo from '../logo.svg';
import '../style/Navi.css'
import '../style/view.css'

const FormItem = Form.Item;

class EditModal extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 7},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 7
            }
        };

        return (
            <Modal
                okText={"确认"}
                cancelText={"取消"}
                title={"编辑"}
                visible={this.props.visible}
                onCancel={() =>
                    this.props.onCancel()
                }
                onOk={() =>
                    this.props.onOk()
                }
            >
                <div style={{minHeight: "500px"}}>

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="商品名称"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '请输入商品名称!'
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="mobile"/>}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="市场价格"
                            hasFeedback
                        >
                            {getFieldDecorator('num', {
                                rules: [{
                                    type: 'number'
                                }, {
                                    required: true, message: '请输入市场价格！'
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="mail"/>}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="商品图片"
                        >
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入您的账号'}]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="user"/>}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="所属的二级分类"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请选择所属的二级分类'
                                }, {
                                    validator: this.checkConfirm
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock"/>} type="password"
                                       onBlur={this.handlePasswordBlur}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="商品描述"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请填写商品描述'
                                }, {
                                    validator: this.checkPassword
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock"/>} type="password"/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="是否热门"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请选择是否热门'
                                }, {
                                    validator: this.checkPassword
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock"/>} type="password"/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="商城价格"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请输入商城价格'
                                }, {
                                    validator: this.checkPassword
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock"/>} type="password"/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="库存量"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请输入库存量'
                                }, {
                                    validator: this.checkPassword
                                }]
                            })(
                                <Input className="content_style" addonBefore={<Icon type="lock"/>} type="password"/>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

export default Form.create()(EditModal)
