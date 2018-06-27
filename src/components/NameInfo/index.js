import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {browser} from 'src';
import Alert from 'components/Alert';
import Confirm from 'components/Confirm';
import {lStore} from 'js/yydjs';
import './style.scss';

@autobind
export default class NameInfo extends React.Component{
    static propTypes={
        name:PropTypes.string,
        cardNumber:PropTypes.string,
        status:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        cause:PropTypes.string,
    }

    static defaultProps={
        name:'',//姓名
        cardNumber:'',//证件号码
        status:'',//审核状态
        cause:'',//审核失败原因
    }

    /*
        <NameInfo
            name="王丽"
            cardNumber="342 *** *** 2345"
        />
    */

    constructor(props){
        super(props);
        this.state={
            showHint:false,//进行审核
            showHint1:false,//审核失败
        };

        this.statusJson={
            1:'未认证',
            2:'审核中',
            3:'审核成功',
            4:'重新审核',
        };
        this.firstEnter=lStore.get('firstEnter');
    }

    componentDidMount(){
        if(!this.firstEnter&&this.props.status==4){
            this.setState({
                showHint1:true,
            });
            lStore.set('firstEnter','1');
        }
    }

    changeStar(value){
        let arr=[];
        let str1='';
        let str2='';

        if(value&&value.length>7){
            arr=value.split('');
            str1=arr.splice(0,3).join('');
            str2=arr.splice(arr.length-4,arr.length).join('');
            arr=str1+'*'.repeat(arr.length)+str2;
        }else{
            arr=value;
        }

        return arr;
    }

    render(){
        const {showHint,showHint1}=this.state;
        let {name,cardNumber,status,cause}=this.props;
        let cardNumber1=this.changeStar(cardNumber);

        return(
            <div className="NameInfo">
                <div
                    className="clickWrap"
                    onClick={(ev)=>{
                        if(!status&&status!=0){
                            this.setState({
                                showHint:true,
                            });
                        }

                        if(status==1){
                            browser.push('/account/real_name_verify');
                        }else if(status==4){
                            this.setState({
                                showHint1:true,
                            });
                        }
                    }}
                >
                    <h3>
                        <span>姓名</span>
                        <em>
                            {name}
                            {
                                status!=0&&status!=3&&
                                <a>
                                    {(status||status==0)?this.statusJson[status+'']:'去审核'}
                                </a>
                            }
                        </em>
                    </h3>
                    <h3>
                        <span>证件号码</span>
                        <em>{cardNumber1}</em>
                    </h3>
                </div>

                <Alert
                    parent={this}
                    state="showHint"
                    show={showHint}
                    title="提醒"
                    content="未完成实名审核会影响您的售出USDT，请先去审核"
                    confirm={()=>{
                        browser.push('/account/real_name_verify');
                    }}
                />

                <Confirm
                    parent={this}
                    state="showHint1"
                    show={showHint1}
                    title="认证提醒"
                    content={(
                        <div className="causeWrap">
                            <h3>实名审核失败</h3>
                            <h3>失败原因：{cause}</h3>
                        </div>
                    )}
                    confirm={()=>{
                        browser.push('/account/real_name_verify');
                    }}
                    rButton="重新审核"
                />
            </div>
        )
    }
}