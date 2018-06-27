import React from 'react';
import {autobind} from 'core-decorators';
import {browser} from 'src';
import {Link} from 'react-router-dom';
import './style.scss';

@autobind
export default class Download extends React.Component{
    render(){
        return(
            <div className={(function(){
                let className='Download';
                let hideArr=['/account/index','/login','/login/register','/account/personal_center','/information'];

                for(let value of hideArr){
                    if(browser.location.pathname==value){
                        className+=' hide';
                        break;
                    }
                }

                return className;
            }())}>
                <h3>FT.Pro客户端</h3>
                <h3>操作更流畅，交易更便捷！</h3>
                <Link to="/download_page">去下载</Link>
            </div>
        )
    }
}