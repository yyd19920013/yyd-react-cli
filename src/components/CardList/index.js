import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import './style.scss';

@autobind
export default class CardList extends React.Component{
    static propTypes={
        index:PropTypes.number,
        bankCode:PropTypes.string,
        bankName:PropTypes.string,
        cardNumber:PropTypes.string,
        onDelete:PropTypes.func,
    }

    static defaultProps={
        index:0,//银行卡索引
        bankCode:'',//银行code，影响银行卡样式
        bankName:'银行名称',//银行名称
        cardNumber:'银行卡号',//银行卡号，点击删除时，在回调函数的参数中返回
        onDelete:()=>{},//点击删除时候的回调函数
    }

    constructor(props){
        super(props);
        this.redCardArr=[
            'ICBC',//工商银行
            'BOC',//中国银行
            'CMB',//招商银行
            'CITIC',//中信银行
            'CGB',//广发银行
            'HXB',//华夏银行
            'PAB',//平安银行
        ];
        this.greenCardArr=[
            'ABC',//农业银行
            'PSBC',//邮政银行
        ];
    }

    /*
        <ul>
            {cardList.map((item,index)=>{
                return(
                    <CardList
                        key={index}
                        index={index}
                        bankName={item.bankName}
                        cardNumber={item.cardNumber}
                        onDelete={(id,index)=>{this.deleteCard(id,index)}}
                    />
                );
            })}
        </ul>
    */

    changeStar(value){
        let arr=[];
        let str='';

        if(value&&value.length>4){
            arr=value.split('');
            str=arr.splice(arr.length-4,arr.length).join('');
            arr='*'.repeat(arr.length)+str;
        }else{
            arr=value;
        }

        return arr;
    }

    render(){
        let {index,bankCode,bankName,cardNumber,onDelete}=this.props;
        let cardNumber1=this.changeStar(cardNumber);

        return(
            <li className={'CardList'+(this.redCardArr.indexOf(bankCode)!=-1?' red':'')+(this.greenCardArr.indexOf(bankCode)!=-1?' green':'')}>
                <h3>
                    <span>{bankName}</span>
                    <i onClick={()=>{onDelete(cardNumber,index)}} className={'iconfont icon-B-1'}></i>
                </h3>
                <h4>{cardNumber1}</h4>
            </li>
        )
    }
}