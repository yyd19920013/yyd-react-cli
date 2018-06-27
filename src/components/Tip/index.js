import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {getPos,getStyle,HasClass} from 'js/yydjs';
import './style.scss';

@autobind
export default class Tip extends React.Component{
    static propTypes={
        text:PropTypes.string,
    }

    static defaultProps={
        text:'这是提示文字',//提示文字内容
    }

    /*
        <Tip
            text="只统计今日新增一级下线用户信息"
        />
    */

    constructor(props){
        super(props);
        this.state={
            showTip:false,
            left1:0,
            right1:'auto',
            left2:0,
            right2:'auto',
        };

        this.Tip=null;
        this.TipText=null;
        this.triangle=null;
        this.timer=null;
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    render(){
        const {text}=this.props;
        let {showTip,left1,right1,left2,right2}=this.state;

        return(
            <div
                ref={(dom)=>{this.Tip=dom}}
                className={'Tip'+(showTip?' active':'')}
                onClick={(ev)=>{
                    let target=ev.currentTarget;
                    let iDW=document.documentElement.clientWidth;
                    let iTW=parseInt(getStyle(this.TipText,'width'));
                    let iL=getPos(target,'left');
                    let left1=-iL+(iDW-iTW)/2;
                    let left2=parseInt(getStyle(this.Tip,'width'))/2-parseInt(getStyle(this.triangle,'width'))/2;

                    if(iL<iDW*1/4){
                        left1=0;
                        right1='auto';
                        left2-=left1;
                        right2='auto';
                    }else if(iL>iDW*3/4){
                        left1='auto';
                        right1=0;
                        right2=left2;
                        left2='auto';
                    }else{
                        right1='auto';
                        left2-=left1;
                        right2='auto';
                    }

                    this.setState({
                        showTip:HasClass(this.Tip,'active')?false:true,
                        left1,
                        left2,
                        right1,
                        right2,
                    });

                    clearTimeout(this.timer);
                    this.timer=setTimeout(()=>{
                        this.setState({
                            showTip:false,
                        });
                    },4000);
                }}
            >
                <i className="iconfont icon-ICON"></i>
                <div ref={(dom)=>{this.TipText=dom}} style={{left:left1,right:right1}} className="TipText">
                    <div ref={(dom)=>{this.triangle=dom}} style={{left:left2,right:right2}} className="triangle"></div>
                    {text}
                </div>
            </div>
        )
    }
}