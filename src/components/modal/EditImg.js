import {Icon, Form, Input, Modal, Upload, message, Select} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../../style/Navi.css'
import '../../style/view.css'
import {fetchPost} from "../../client";

const FormItem = Form.Item;
const baseUrl = "http://www.smarticloudnet.com";
const imgFile = null;

class EditImg extends Component {
    state = {
        loading: false,
        imageUrl: "",
        upload: false,
        formData: new FormData()
    };
    name = "";

    /*
     *上传之前判断类型，返回true或者false；或者返回一个promise
     */
    beforeUpload(file) {
        const reader = new FileReader();
        const stream = reader.readAsDataURL(file);
        this.getBase64(file, (result) => {
            this.setState({
                formData: this.state.formData.append("fileName", result)
            })
        });

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

    /*转base64*/
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    /*上传图片并且改变显示*/
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({
                loading: true
            });
            return;
        }
        if (info.file.status === 'done') {
            console.log(this.state.formData)
            console.log(info);
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    imageUrl,
                    loading: false,
                    upload: true
                }, message.info("上传成功！"))
            });
        } else {
            this.setState({
                loading: false,
                upload: true
            }, message.info("上传失败！"));
        }
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
        const pid = JSON.stringify(this.props.oneList) != "{}" ? this.props.oneList.pid : "";
        const url = "http://www.smarticloudnet.com/shop/manager/product/update_img?pid=" + pid;
        return (
            <Modal
                okText={"确认"}
                cancelText={"取消"}
                title={"编辑图片"}
                visible={this.props.visible}
                onCancel={() => {
                    if (this.state.upload) {
                        this.props.onCancel()
                    } else {
                        message.info("请等待上传！");
                    }
                }}
                onOk={() => {
                    if (this.state.upload) {
                        this.props.onOk()
                    } else {
                        message.info("请等待上传！");
                    }
                }}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="商品图片"
                    >
                        {getFieldDecorator('image', {
                            rules: [{required: true, message: '请选择商品图片！'}]
                        })(
                            <Upload
                                data={this.state.formData}
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={url}   //上传的地址，必填参数
                                beforeUpload={(file) => this.beforeUpload(file)}
                                onChange={(info) => this.handleChange(info)}
                            >
                                {imageUrl ? <img style={{width: "50px", height: "50px"}} src={imageUrl}
                                                 alt="avatar"/> : uploadButton}
                            </Upload>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(EditImg)
