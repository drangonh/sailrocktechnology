import {Icon, Form, Input, Modal, Upload, message, Select, Button} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../../style/Navi.css'
import '../../style/view.css'
import {fetchPost} from "../../client";
import reqwest from 'reqwest';

class EditImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: "",
            upload: false,
            formData: new FormData(),
            fileList: []
        };
        this.name = "";
        this.pid = "";
        this.url = "http://www.smarticloudnet.com/shop/manager/product/update_img?pid=";
    }


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
    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('fileName', file);
        });

        this.setState({
            uploading: true,
        });

        reqwest({
            url: this.url + this.pid,
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('上传成功');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('上传失败');
            },
        });
    }


    render() {
        this.pid = JSON.stringify(this.props.oneList) != "{}" ? this.props.oneList.pid : "";
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const {loading} = this.state;
        const props = {
            action: this.url + this.pid,
            onRemove: (file) => {
                this.setState(({fileList}) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({fileList}) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        return (
            <Modal
                okText={"确认"}
                cancelText={"取消"}
                title={"编辑图片"}
                visible={this.props.visible}
                onCancel={() => {
                    this.props.onCancel()
                }}
                onOk={() => {
                    this.props.onOk()
                }}
            >
                <Upload {...props}>
                    <Button>
                        <Icon type="upload"/> Select File
                    </Button>
                </Upload>
                <Button
                    className="upload-demo-start"
                    type="primary"
                    onClick={() => this.handleUpload()}
                    disabled={false}
                    loading={loading}
                >
                    {loading ? 'Uploading' : 'Start Upload'}
                </Button>
            </Modal>
        )
    }
}

export default Form.create()(EditImg)
