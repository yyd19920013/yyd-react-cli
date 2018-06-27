import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {getDecimal} from 'js/yydjs';
import './style.scss';

@autobind
export default class ProgressBar extends React.Component{
    static propTypes={
        index:PropTypes.number,
        name:PropTypes.string,
        price:PropTypes.number.isRequired,
        total:PropTypes.number.isRequired,
        unit:PropTypes.string,
        count:PropTypes.number,
    }

    static defaultProps={
        index:0,//索引，根据这个显示不同进度条颜色
        name:'名字',//名字
        price:1,//金额（必填）
        total:1,//最大金额，以第一名为最大（必填）
        unit:'单位',//单位
        count:1,//多少手统计
    }

    /*
        dataList:[
                {
                    name:'王莉',
                    price:56490,
                    unit:'USDT',
                    count:16,
                },
                {
                    name:'周大大',
                    price:41440.9,
                    unit:'USDT',
                    count:15,
                },
                {
                    name:'李达康',
                    price:35430.9,
                    unit:'USDT',
                    count:10,
                },
                {
                    name:'陈颖',
                    price:21230.9,
                    unit:'USDT',
                    count:3,
                },
                {
                    name:'黄晓明',
                    price:14230.9,
                    unit:'USDT',
                    count:14,
                },
            ],

        {dataList.map((item,index,array)=>(
            <ProgressBar
                key={index}
                index={index}
                name={item.name}
                price={item.price}
                total={array[0].price}
                unit={item.unit}
                count={item.count}
            />
        ))}
    */

    constructor(props){
        super(props);
        this.arr=[
            '#1e59c0,#1e59c0',
            '#266bda,#266bda',
            '#4989f0,#4989f0',
            '#73a8fe,#73a8fe',
            '#9cc2ff,#9cc2ff',
        ];
    }

    render(){
        const {index,name,price,total,unit,count}=this.props;

        return(
            <div className="ProgressBar">
                <div className="nameWrap">{name&&name.length>4?'***'+name.substring(name.length-4,name.length):name}</div>
                <div style={{width:(price/total*100+'%')}} className="barWrap">
                    <div className="total">{getDecimal(price)}{unit}（{count}手）</div>
                    <div style={{backgroundImage:'linear-gradient(to right,'+this.arr[index]+')'}} className="bar"></div>
                </div>
            </div>
        )
    }
}