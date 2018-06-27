import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import VTypeJson from './VTypeJson';
import {QSA} from 'js/yydjs';
import './style.scss';

@autobind
export default class VType extends React.Component{
    static propTypes={
        value:PropTypes.any.isRequired,
        require:PropTypes.bool,
        conditions:PropTypes.array,
        closeVerify:PropTypes.bool,
        parent:PropTypes.object,
        allPass:PropTypes.string,
    }

    static defaultProps={
        value:'',//值，主要用于验证是否必须（必须）
        require:false,//是否必须
        conditions:[],//多条件数组
        /*
            条件数组内json定义
            {
                if:realName>10,//满足条件则会提示
                type:'number',//不满足类型则会提示
                reg:/^\w+$/,//不满足正则则会提示
                hint:'请输入小于10的数字',//提示文字
            }
        */
        closeVerify:false,//是否关闭验证，默认开启
        parent:null,//父组件的this，用于绑定allpass
        allPass:'',//绑定allPass到父组件的state上，字符串，推荐只写在一个验证组件里
    }

    /*
        <VType
            value={realName}
            require={true}
            conditions={[
                {
                    if:realName>10,
                    hint:'不能大于10',
                },
                {
                    type:'mobile',
                    hint:'请输入有效的数字',
                },
                {
                    reg:/^\w+$/,
                    hint:'请输入数字或英文字母',
                },
                {
                    if:realName>10,
                    type:'number',
                    reg:/^\w+$/,
                    hint:'请输入小于10的数字',
                }
            ]}
            parent={this}
            allPass="allPass"
        />
    */

    constructor(props){
        super(props);
        this.onOff=true;
        this.symbol=Symbol('组件this');
        this.dirty=0;
        this.isFail=false;
        this.hint='';
        this.hintType='default';
        this.hintJson={
            default:'验证不通过',
            require:'请填写字段',
        };
        var regJson={//所有type类型
            number:{
                name:'数字',
                reg:/^[0-9]+$/,
            },
            aa:{
                name:'小写字母',
                reg:/^[a-z]+$/,
            },
            AA:{
                nmae:'大写字母',
                reg:/^[A-Z]+$/,
            },
            aA:{
                name:'字母',
                reg:/^[a-zA-Z]+$/,
            },
            aa1:{
                name:'小写字母或数字',
                reg:/^[a-z0-9]+$/,
            },
            AA1:{
                name:'大写字母或数字',
                reg:/^[A-Z0-9]+$/,
            },
            aA1:{
                name:'字母和数字',
                reg:/^\w+$/,
            },
            zh:{
                name:'中文',
                reg:/^[\u2E80-\u9FFF]+$/,
            },
            zhEn:{
                name:'中文或英文',
                reg:/^[\u2E80-\u9FFFa-zA-Z]+$/,
            },
            mobile:{
                name:'手机号',
                reg:/^1[3-9]{1}\d{9}$/,
            },
            identity:{
                name:'身份证号码',
                reg:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            },
            bankCard:{
                name:'银行卡号',
                reg:/^[0-9]{8,28}$/,
            },
            user:{
                name:'用户名',
                reg:/^[\w-]{3,16}$/,
            },
            password:{
                name:'密码',
                reg:/^[\w-]{6,20}$/,
            },
            email:{
                name:'邮箱',
                reg:/^([\w\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            },
        };
    }

    componentDidMount(){
        VTypeJson[this.symbol]=this;
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.value){
            if(VTypeJson[this.symbol])VTypeJson[this.symbol].dirty+=1;
        }
        return true;
    }

    componentWillUnmount(){
        this.onOff=false;
        delete VTypeJson[this.symbol];
    }

    verify(){
        if(!this.onOff)return;

        let {value,require,conditions,parent,allPass}=this.props;
        let This=this;

        value=value.trim();
        this.hint='';

        if(require){
            if(value==''){
                this.isFail=true;
                this.hintType='require';
            }else if(conditions&&conditions.length){
                this.isFail=false;
                for(let json of conditions){
                    if(json.if&&json.type&&json.reg){
                        if(!this.regJson[json.type].reg.test(value)&&!json.reg.test(value)){
                            this.isFail=true;
                            this.hint=json.hint?json.hint:'请输入有效的'+this.regJson[json.type].name;
                            break;
                        }
                    }else if(json.if&&json.type){
                        if(!this.regJson[json.type].reg.test(value)){
                            this.isFail=true;
                            this.hint=json.hint?json.hint:'请输入有效的'+this.regJson[json.type].name;
                            break;
                        }
                    }else if(json.if&&json.reg){
                        if(!json.reg.test(value)){
                            this.isFail=true;
                            this.hint=json.hint?json.hint:'';
                            break;
                        }
                    }else if(json.if){
                        this.isFail=true;
                        this.hint=json.hint?json.hint:'';
                        break;
                    }else if(json.type){
                        if(!this.regJson[json.type].reg.test(value)){
                            this.isFail=true;
                            this.hint=json.hint?json.hint:'请输入有效的'+this.regJson[json.type].name;
                            break;
                        }
                    }else if(json.reg){
                        if(!json.reg.test(value)){
                            this.isFail=true;
                            this.hint=json.hint?json.hint:'';
                            break;
                        }
                    }else{
                        this.isFail=false;
                    }
                }
            }else{
                this.isFail=false;
            }
        }

        this.hint=this.hint?this.hint:this.hintJson[this.hintType];

        setTimeout(()=>{
            if(!this.onOff)return;

            let bool=QSA('.VType').length==QSA('.VType.dirty').length&&!QSA('.VType.active').length;

            if(parent&&allPass&&parent.setState&&parent.state[allPass]!=bool){
                parent.setState({
                    [allPass]:bool,
                });
            }
        });
        return (this.dirty>0&&this.isFail);
    }

    render(){
        const {dirty}=this;
        const {closeVerify}=this.props;
        const isFail=this.verify();
        const {hint}=this;

        return(
            <div className={'VType'+(dirty?' dirty':'')+((!closeVerify&&isFail)?' active':'')}>
                {hint}
            </div>
        )
    }
}