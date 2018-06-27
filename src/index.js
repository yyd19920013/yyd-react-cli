import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import createBrowserHistory from 'history/createBrowserHistory';
import {ConnectedRouter,routerMiddleware} from 'react-router-redux';
import {Route} from 'react-router-dom';
import store from 'store';
import App from 'pages/App';
import {htmlFontSize,consoleNull} from 'js/yydjs';
import 'css/index.css';

export const browser=createBrowserHistory();
export const middleware=routerMiddleware(browser);

htmlFontSize();//改变根节点字体大小
if(window.location.hostname!=='localhost')consoleNull(['log']);//线上禁止用控制台输出

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={browser}>
            <Route path='/' component={App} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
