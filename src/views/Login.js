import React, {Component} from 'react';
import '../style/App.css';
import '../style/view.css';
import createHistory from 'history/createHashHistory'
import {Form, Input, Button, message} from 'antd';
import {fetchPost} from "../client"
import Cookies from "js-cookie"
const FormItem = Form.Item;
const history = createHistory();

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    userName = "";
    pwd = "";

    async login() {
        const data = await fetchPost("/shop/manager/user/login/" + this.userName + "/" + this.pwd + "", {});
        console.log(data);
        if (data.status) {
            Cookies.set('userName', data.data.name);
            history.push('/index');
        } else {
            message.info(data.msg);
        }
    }

    handleChange(event) {
        event.preventDefault();
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
                                onChange={(event) => {
                                    this.userName = event.target.value;
                                }}
                                style={{width: '100%', marginTop: "1em", height: "2em"}}
                                placeholder="请输入账号"/>
                        </FormItem>
                        <FormItem>
                            <Input
                                onChange={(event) => {
                                    this.pwd = event.target.value;
                                }}
                                style={{width: '100%', marginTop: "1em", height: "2em"}}
                                type="password"
                                placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button
                                onClick={() => this.login()}
                                type="primary"
                                htmlType="submit"
                                style={{width: '100%', marginTop: "1em", height: "2em", fontSize: "20px"}}
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
