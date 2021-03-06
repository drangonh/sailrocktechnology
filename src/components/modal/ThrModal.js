import {Icon, Form, Input, Modal, Upload, message, Select} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../../style/Navi.css'
import '../../style/view.css'
import {fetchPost} from "../../client";

const FormItem = Form.Item;

class ThrModal extends Component {
    state = {
        loading: false,
    };
    name = "";
    typeId = 0;

    /*选择框*/
    changeHot(value) {
        this.typeId = this.props.oneType[value.replace("oneType", "")].cid
    }


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

        const Option = Select.Option;
        return (
            <Modal
                okText={"确认"}
                cancelText={"取消"}
                title={this.props.title}
                visible={this.props.visible}
                onCancel={() => {
                    this.props.form.resetFields();
                    this.props.onCancel()

                }}
                onOk={() => {
                    this.props.form.resetFields();
                    this.props.onOk({
                        "cid": this.typeId,
                        "csname": this.name
                    })
                }}
            >
                <div style={{minHeight: "200px"}}>

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="三级分类名称"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '请输入分类名称!'
                                }]
                            })(
                                <Input
                                    placeholder={this.props.value ? this.props.value.csname : ""}
                                    onChange={(event) => {
                                        this.name = event.target.value;
                                    }}
                                    addonBefore={<Icon type="mobile"/>}
                                />
                            )}
                        </FormItem>


                        <FormItem
                            {...formItemLayout}
                            label="所属的二级分类"
                        >
                            {getFieldDecorator('class', {
                                rules: [{
                                    required: true, message: '请选择所属的二级分类'
                                }, {
                                    validator: this.checkPassword
                                }]
                            })(
                                <Select
                                    placeholder="请选择分类！"
                                    onChange={(value) => this.changeHot(value)
                                    }>

                                    {this.props.oneType.map((item, index) => {
                                        return <Option
                                            key={"oneType" + index}
                                            value={"oneType" + index}
                                        >
                                            {item.cname}
                                        </Option>
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

export default Form.create()(ThrModal)
