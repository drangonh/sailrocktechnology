import React from 'react';
import {HashRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './views/Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
        <HashRouter>
            <Login/>
        </HashRouter>
    )
    , document.getElementById('root'));
registerServiceWorker();
