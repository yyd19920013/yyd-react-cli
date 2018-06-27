import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {Link} from 'react-router-dom';
import {browser} from 'src';
import './style.scss';

@autobind
export default class Header extends React.Component{
    static propTypes={
        title:PropTypes.string,
        to:PropTypes.string,
        hideArrow:PropTypes.bool,
        rightText:PropTypes.object,
        rightIcon:PropTypes.object,
        leftClick:PropTypes.func,
        rightClick:PropTypes.func,
    }

    static defaultProps={
        title:'未设置标题',//标题
        to:'',//如果有此参数，则点击箭头改为定向跳转
        hideArrow:false,//是否隐藏返回箭头
        rightText:null,//右边的文字设置
        /*
            {
                name:'',//文字名称
                to:'',//跳转地址
            }
        */
        rightIcon:null,//右边的图标设置
        /*
            {
                name:'',//图标类名
                to:'',//跳转地址
            }
        */
        leftClick:null,//左边箭头点击触发的函数，如果使用该方法则外层to失效
        rightClick:null,//右边文字或图标点击触发的函数，如果使用该方法则里层to失效
    }

    /*
        <Header
            title="添加银行卡"
            hideArrow="true"
            rightText={{
                name:'手动输入',
                to:'/11',
            }}
            // rightIcon={{
            //     name:'icon-B-Copy3',
            //     to:'/22',
            // }}
            rightClick={()=>{
                console.log('点击了');
            }}
        />
    */

    render(){
        const {title,to,hideArrow,rightText,rightIcon,leftClick,rightClick,children}=this.props;

        return(
            <div className="Header">
                {
                    !hideArrow&&
                    <span
                        onClick={(ev)=>{
                            if(leftClick){
                                leftClick();
                                return;
                            }
                            to?browser.push(to):browser.go(-1);
                        }}
                        className="goBack"
                    >
                        <i className={'iconfont icon-B-'}></i>
                    </span>
                }
                <h2 className="HeaderText">{title}</h2>
                {
                    rightText?
                    <span className="rightItem">
                        {
                            !rightClick&&rightText.to?
                            <Link to={rightText.to}>
                                <i>{rightText.name}</i>
                            </Link>:
                            <i onClick={()=>{rightClick&&rightClick()}}>{rightText.name}</i>
                        }
                    </span>:
                    rightIcon&&
                    <span className="rightItem">
                        {
                            !rightClick&&rightIcon.to?
                            <Link to={rightIcon.to}>
                                <i className={'iconfont '+(rightIcon.name?rightIcon.name:'')}></i>
                            </Link>:
                            <i onClick={()=>{rightClick&&rightClick()}} className={'iconfont '+(rightIcon.name?rightIcon.name:'')}></i>
                        }
                    </span>
                }

                {React.Children.map(children,(item,index)=>(
                    item
                ))}
            </div>
        )
    }
}