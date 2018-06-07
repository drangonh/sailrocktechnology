import React, {Component} from 'react';
import '../style/App.css';
import '../style/view.css';

import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    login(){
        this.props.history.push('/Menu')
    }

    render() {
        return (
            <div className="login App">
                <div className="login-form">
                    <div className="login-logo">
                        <span className="App-title">上海帆岩信息科技有限公司</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            <Input
                                style={{width: '100%', marginTop: "2em", height: "2em"}}
                                placeholder="请输入账号"/>
                        </FormItem>
                        <FormItem>
                            <Input
                                style={{width: '100%', marginTop: "2em", height: "2em"}}
                                type="password"
                                placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button
                                onClick={()=>this.login()}
                                type="primary"
                                htmlType="submit"
                                style={{width: '100%', marginTop: "2em", height: "2em",fontSize:"20px"}}
                            >
                                登录
                            </Button>

                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;
