import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login';
import Navi from './views/Navi';
import registerServiceWorker from './registerServiceWorker';
import {Route} from 'react-router';

ReactDOM.render((
        <BrowserRouter>
            <div id="wrapper">
                {/*<Route exact path="/" component={Login}/>*/}
                <Route exact path="/" component={Navi}/>
            </div>
        </BrowserRouter>
    )
    , document.getElementById('root'));
registerServiceWorker();
