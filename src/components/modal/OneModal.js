import {Icon, Form, Input, Modal, Upload, message, Select} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../../style/Navi.css'
import '../../style/view.css'
import {fetchPost} from "../../client";

const FormItem = Form.Item;

class OneModal extends Component {
    state = {
        loading: false,
    };
    name = "";

    /*
     *上传之前判断类型，返回true或者false；或者返回一个promise
     */
    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    /*取消选中和取消输入框*/
    cancelAllMsg() {

    }

    /*提交接口*/
    commitMsg() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        //关键代码，不过这样会带来一个问题，校验时无法显示提示信息,解决方案看第二篇博客
        this.props.form.resetFields();
    };


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

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const Option = Select.Option;
        // alert(JSON.stringify(this.props.value))
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
                    this.props.onOk({"tcname": this.name})
                }}
            >
                <div style={{minHeight: "200px"}}>

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="一级分类"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '请输入分类名称!'
                                }]
                            })(
                                <Input
                                    placeholder={this.props.value && this.props.visible ? this.props.value.tcname : ""}
                                    onChange={(event) => {
                                        this.name = event.target.value;
                                    }}
                                    addonBefore={<Icon type="mobile"/>}
                                />
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

export default Form.create()(OneModal)
