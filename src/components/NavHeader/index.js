import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {NavLink} from 'react-router-dom';
import {browser} from 'src';
import './style.scss';

@autobind
export default class NavHeader extends React.Component{
    static propTypes={
        dataList:PropTypes.arrayOf(PropTypes.object),
        to:PropTypes.string,
        hideArrow:PropTypes.bool,
    }

    static defaultProps={
        dataList:[{//要展示在Footer的数据
            name:'头部导航',//显示的文字
            to:'123',//跳转的地址
        }],
        to:'',//如果有此参数，则点击箭头改为定向跳转
        hideArrow:false,//是否隐藏返回箭头
    }

    /*
        <NavHeader
            dataList={[
                {
                    name:'提现记录',
                    to:'/account/withdraw_record/index',
                },
                {
                    name:'资金流水',
                    to:'/account/withdraw_record/capital_detail',
                },
            ]}
            hideArrow={true}
        />
    */

    render(){
        const {dataList,to,hideArrow}=this.props;

        return(
            <div className="NavHeader">
                {
                    !hideArrow&&
                    <span
                        onClick={(ev)=>{
                            to?browser.push(to):browser.go(-1);
                        }}
                        className="goBack"
                    >
                        <i className={'iconfont icon-B-'}></i>
                    </span>
                }

                {dataList.map((item,index)=>{
                    return(
                        <NavLink activeClassName="active" key={index} to={item.to?item.to:'/'}>
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </div>
        )
    }
}
