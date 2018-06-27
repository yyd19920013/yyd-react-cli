import React from 'react';
import {autobind} from 'core-decorators';
import {Link} from 'react-router-dom';
import './style.scss';

@autobind
export default class Page404 extends React.Component{
    render(){
        return(
            <div className="Page404">
                <div className="goHome">
                    <Link to="/information/index">回到首页</Link>
                </div>
            </div>
        )
    }
}