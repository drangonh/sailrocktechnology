import {Icon, Form, Input, Modal, Upload, message, Select, Button} from 'antd';
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../../style/Navi.css'
import '../../style/view.css'
import reqwest from "reqwest";

const FormItem = Form.Item;
let pdate = "";

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.getCurrentTimeFormat()
        this.url = "http://www.smarticloudnet.com/shop/manager/product/add?pname=";
        this.state = {
            loading: false,
            fileList: []
        };
        this.obj = this.props.oneList;
    }

    getCurrentTimeFormat() {
        let time = new Date();
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        let typeString = '-';

        const t = y + typeString + this.add0(m) + typeString + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
        pdate = t;
    }

    add0(m) {
        return m < 10 ? '0' + m : m
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
        const url = this.url + this.obj.pname +
            "&marketPric=" + this.obj.marketPrice +
            "&shopPrice=" + this.obj.shopPrice +
            "&inventory=" + this.obj.inventory +
            "&pdesc=" + this.obj.pdesc +
            "&isHot=" + this.obj.isHot +
            "&pdate=" + pdate +
            "&csid=" + this.obj.csid;

        reqwest({
            url: url,
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
    };

    render() {
        this.obj = this.props.oneList;
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
        const imageUrl = this.state.imageUrl;
        const Option = Select.Option;
        const {loading} = this.state;
        const url = this.url + this.obj.pname +
            "&marketPric=" + this.obj.marketPrice +
            "&shopPrice=" + this.obj.shopPrice +
            "&inventory=" + this.obj.inventory +
            "&pdesc=" + this.obj.pdesc +
            "&isHot=" + this.obj.isHot +
            "&pdate=" + pdate +
            "&csid=" + this.obj.csid;

        const props = {
            action: url,
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
                title={this.props.title}
                visible={this.props.visible}
                onCancel={() => {
                    this.props.form.resetFields();
                    this.props.onCancel()
                }}
                onOk={() => {
                    this.props.form.resetFields();
                    if (this.props.title == "编辑内容") {
                        this.props.onOk(this.obj)
                    } else {
                        this.handleUpload()
                    }
                }}
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
                                <Input
                                    onChange={(event) => {
                                        this.obj.pname = event.target.value
                                    }}
                                    placeholder={JSON.stringify(this.props.oneList) != "{}" ? this.props.oneList.pname : ""}
                                    className="content_style" addonBefore={<Icon type="mobile"/>}/>
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
                                <Input
                                    onChange={(event) => {
                                        this.obj.marketPrice = event.target.value
                                    }}
                                    placeholder={JSON.stringify(this.props.oneList) != "{}" ? this.props.oneList.marketPrice : ""}
                                    type={"number"} className="content_style" addonBefore={<Icon type="mobile"/>}/>
                            )}
                        </FormItem>

                        {this.props.title.indexOf("编辑") == -1 ?
                            <FormItem
                                {...formItemLayout}
                                label="选择图片"
                            >
                                {this.props.title.indexOf("编辑") == -1 ?
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload"/> 选择图片
                                        </Button>
                                    </Upload> : null}
                            </FormItem> :
                            null
                        }

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
                                    onChange={(value) => {
                                        this.obj.csid = this.props.oneType[value.replace("oneType", "")].csid
                                    }}>

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
                                <Input
                                    onChange={(event) => {
                                        this.obj.pdesc = event.target.value
                                    }}
                                    placeholder={JSON.stringify(this.props.oneList) != "{}" ? this.props.oneList.pdesc : ""}
                                    className="content_style" addonBefore={<Icon type="lock"/>}/>
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
                                <Select style={{width: 120}}
                                        onChange={(value) => {
                                            if (value == "index0") {
                                                this.obj.isHot = 1;
                                            } else {
                                                this.obj.isHot = 0;
                                            }
                                        }}>
                                    <Option value="index0">是</Option>
                                    <Option value="index1">否</Option>
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
                                <Input
                                    onChange={(event) => {
                                        this.obj.shopPrice = event.target.value;
                                    }}
                                    placeholder={JSON.stringify(this.props.oneList) != "{}" ? this.props.oneList.shopPrice : ""}
                                    className="content_style" addonBefore={<Icon type="lock"/>} type="number"/>
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
                                <Input
                                    onChange={(event) => {
                                        this.obj.inventory = event.target.value;
                                    }}
                                    placeholder={JSON.stringify(this.props.oneList) != "{}" ? this.props.oneList.inventory : ""}
                                    className="content_style" addonBefore={<Icon type="lock"/>} type="number"/>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

export default Form.create()(EditModal)
