import React, {Component} from 'react';
import logo from '../logo.svg';
import '../style/App.css';
import '../style/view.css';

class Login extends Component {

    login() {
        alert(55);
    }

    render() {
        return (
            <div className="App basicBg textCenter">
                <header className="App-header center">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Hello World</h1>
                </header>
                <div className="flex udc basicBg center">
                    <div className="App-intro h50 flex center">
                        <p>管理员姓名：</p>
                        <textarea className="h2"/>
                    </div>
                    <div className="App-intro flex h50 center">
                        <p>管理员密码：</p>
                        <textarea className="h2"/>
                    </div>

                    <button className="loginButton center App-intro" onClick={() => this.login()}>登陆</button>
                </div>
            </div>
        );
    }
}

export default Login;
