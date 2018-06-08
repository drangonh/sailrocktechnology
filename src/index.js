import React from 'react';
import {BrowserRouter,HashRouter,Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login';
import CSRouter from './views/ceshi/CSRouter';
import Navi from './views/Navi';
import registerServiceWorker from './registerServiceWorker';
import {Route} from 'react-router';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const location = history.location
ReactDOM.render((

        <HashRouter>
            <div>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/index" component={Navi}/>
                {/*设置默认的首页为登陆页面*/}
                {location.hash === '#/' ? <Redirect to='/login' /> : ''}
            </div>
        </HashRouter>
    )
    , document.getElementById('root'));
registerServiceWorker();
