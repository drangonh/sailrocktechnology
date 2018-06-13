import {Icon, Form, Input, Modal, Upload, message, Select} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../../style/Navi.css'
import '../../style/view.css'

const FormItem = Form.Item;

class EditModal extends Component {
    state = {
        loading: false,
    };

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

    /*上传图片并且改变显示*/
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    /*转base64*/
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    /*选择框*/
    changeHot(value) {
        console.log(`selected ${value}`);
    }

    /*取消选中和取消输入框*/
    cancelAllMsg() {

    }

    /*提交接口*/
    commitMsg() {

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

        return (
            <Modal
                okText={"确认"}
                cancelText={"取消"}
                title={this.props.title}
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
                        >
                            {getFieldDecorator('mallPrice', {
                                rules: [{
                                    required: true, message: '请输入市场价格!'
                                }]
                            })(
                                <Input type={"number"} className="content_style" addonBefore={<Icon type="mobile"/>}/>
                            )}
                        </FormItem>

                        {this.props.title.indexOf("编辑") == -1 ?
                            <FormItem
                                {...formItemLayout}
                                label="商品图片"
                            >
                                {getFieldDecorator('image', {
                                    rules: [{required: true, message: '请选择商品图片！'}]
                                })(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"   //上传的地址，必填参数
                                        beforeUpload={(file) => this.beforeUpload(file)}
                                        onChange={(info) => this.handleChange(info)}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar"/> : uploadButton}
                                    </Upload>
                                )}
                            </FormItem> : null}


                        <FormItem
                            {...formItemLayout}
                            label="所属的三级分类"
                        >
                            {getFieldDecorator('class', {
                                rules: [{
                                    required: true, message: '请选择所属的三级分类'
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
                                            {item.csname}
                                        </Option>
                                    })}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="商品描述"
                            hasFeedback
                        >
                            {getFieldDecorator('detail', {
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
                            {getFieldDecorator('hot', {
                                rules: [{
                                    required: true, message: '请选择是否热门'
                                }, {
                                    validator: this.checkPassword
                                }]
                            })(
                                <Select defaultValue="否" style={{width: 120}}
                                        onChange={(value) => this.changeHot(value)}>
                                    <Option value="jack">是</Option>
                                    <Option value="lucy">否</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="商城价格"
                            hasFeedback
                        >
                            {getFieldDecorator('price', {
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
                            {getFieldDecorator('storage', {
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
