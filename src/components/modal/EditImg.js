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
            fileList: []
        };
        this.pid = "";
        this.url = "http://www.smarticloudnet.com/shop/manager/product/update_img?pid=";
    }

    /*上传图片并且改变显示*/
    handleUpload = () => {
        this.props.onCancel()
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
                this.props.onOk(true)
                message.success('上传成功');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                this.props.onOk(false)
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
                    this.handleUpload()
                }}
            >
                <Upload {...props}>
                    <Button>
                        <Icon type="upload"/> Select File
                    </Button>
                </Upload>
            </Modal>
        )
    }
}

export default Form.create()(EditImg)
