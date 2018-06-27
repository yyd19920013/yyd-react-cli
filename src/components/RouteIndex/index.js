import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {browser} from 'src';
import './style.scss';

@autobind
export default class RouteIndex extends React.Component{
    static propTypes={
        path:PropTypes.string.isRequired,
        component:PropTypes.func.isRequired,
    }

    static defaultProps={
        path:'',//匹配路径名称（必填）
        component:()=>{},//匹配的组件（必填）
    }

    /*
        <RouteIndex path="/account" component={AccountIndex} />
    */

    render(){
        const {pathname}=browser.location;
        const {path,component}=this.props;
        const Component=component;

        return(
            <div className="RouteIndex">
                {
                    (pathname==path||pathname==(path+'/')||pathname==(path+'/index'))&&
                    <Component />
                }
            </div>
        )
    }
}