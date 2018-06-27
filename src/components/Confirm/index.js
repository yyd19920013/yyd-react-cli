import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import Dialog from 'components/Dialog';
import './style.scss';

@autobind
export default class Confirm extends React.Component{
    static propTypes={
        parent:PropTypes.object.isRequired,
        state:PropTypes.string.isRequired,
        show:PropTypes.bool.isRequired,
        title:PropTypes.string,
        content:PropTypes.any,
        confirm:PropTypes.func,
        cancel:PropTypes.func,
        lButton:PropTypes.string,
        rButton:PropTypes.string,
        maskClose:PropTypes.bool,
    }

    static defaultProps={
        parent:null,//父组件的this（必填）
        state:null,//父组件控制这个弹窗的state名字，字符串（必填）
        show:false,//父组件控制这个弹窗的state名字，本身（必填）
        title:'弹窗默认标题',//弹窗标题
        content:'',//弹窗主题内容
        confirm:()=>{},//确定触发函数
        cancel:()=>{},//取消触发函数
        lButton:'取消',//左按钮文字
        rButton:'确定',//右按钮文字
        maskClose:true,//点击遮罩是否关闭
    }

    /*
        <Confirm
            parent={this}
            state="show"
            show={show}
            title="修改密码"
            content={<h1>我是内容</h1>}
            confirm={()=>{console.log('确定')}}
            cancel={()=>{console.log('取消')}}
            lButton="取消"
            rButton="确定"
        />
    */

    clickHandle(bool){
        const {state,confirm,cancel}=this.props;

        this.props.parent.setState({
            [state]:false,
        });

        bool?confirm&&confirm():cancel&&cancel();
    }

    render(){
        const {parent,state,show,title,content,lButton,rButton,maskClose}=this.props;

        return(
            <div className="Confirm">
                <Dialog
                    parent={parent}
                    state={state}
                    showDialog={show}
                    title={title||'弹窗'}
                    content={content}
                    maskClose={maskClose}
                >
                    <div className="main">
                        {content}
                    </div>

                    <div className="end1">
                        <span onClick={(ev)=>{this.clickHandle(false)}}>{lButton}</span>
                        <span onClick={(ev)=>{this.clickHandle(true)}}>{rButton}</span>
                    </div>
                </Dialog>
            </div>
        )
    }
}