import React, {Component} from 'react';
import logo from '../logo.svg';
import '../style/App.css';
import '../style/view.css';

class Header extends Component {
    render() {
        return (
                <header className="App-header center">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">上海帆岩信息科技有限公司</h1>
                </header>
        );
    }
}

export default Header;
