import React, {Component} from 'react';
import '../style/App.css';
import '../style/view.css';
import Header from "../components/Header"
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    login() {
        this.setState({
            redirect: true
        })
    }

    render() {
        return (
            <div className="App basicBg textCenter">
                <Header/>
                <div className="flex udc basicBg center">
                    <div className="App-intro h50 flex center">
                        <p>管理员姓名：</p>
                        <textarea className="h2"/>
                    </div>
                    <div className="App-intro flex h50 center">
                        <p>管理员密码：</p>
                        <textarea className="h2"/>
                    </div>
                    {
                        this.state.redirect ?
                            <Redirect push to="/Menu"/> :
                            <button
                                className="loginButton center App-intro"
                                onClick={() => this.login()}>
                                登陆
                            </button>
                    }
                </div>
            </div>
        );
    }
}

export default Login;
