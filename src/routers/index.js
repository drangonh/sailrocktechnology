import React, {Component} from "react";
import {
    BrowserRouter as Router, // 或者是HashRouter、MemoryRouter
    Route,   // 这是基本的路由块
    Link,    // 这是a标签
    Switch,  // 这是监听空路由的
    Redirect, // 这是重定向
    Prompt   // 防止转换
} from 'react-router-dom'

/*配置路由*/
export default class index extends Component {
    render() {
        <BrowserRouter>
            <div>
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
            </div>
        </BrowserRouter>
    }
}