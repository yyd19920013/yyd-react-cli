import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import {getYearDate} from 'services';
import {getDecimal,dateFormat0} from 'js/yydjs';
import lineData from './lineData';
import './style.scss';

@autobind
export default class Chartview extends React.Component{
    static propTypes={
        useCache:PropTypes.bool,
    }

    static defaultProps={
        useCache:false,//是否使用缓存数据
    }

    /*
        <Chartview
            useCache={true}
        />
    */

    constructor(props){
        super(props);
        this.state={
            lineData:{
                value:'1',
                date:'',
            },
        };

        this.json={
            code:'bitcoin',
            startTime:+new Date()-(1000*60*60*24*365),//1496284287012,
            endTime:+new Date(),//1527820313967
        };
        this.chartview=null;
    }

    componentDidMount(){
        //生成图表
        this.createChart();
    }

    createChart(){
        let This=this;
        let myChart=echarts.init(this.chartview);
        let date=[];
        let data1=[];
        let data2=[];

        let option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return ['50%',-50];
                },
                backgroundColor:'rgba(255,255,255,.9)',
                textStyle:{
                    color:'#333',
                },
                axisPointer:{
                    lineStyle:{
                        type:'dashed',
                        color:'#fff',
                        opacity:0.6,
                    },
                },
                formatter:function(params){
                    This.setState({
                        lineData:{
                            value:params[0].data,
                            date:params[0].name,
                        },
                    });
                },
            },
            grid:{
                top:'-60%',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
                axisLine:{
                    lineStyle:{
                        color:'#3b6bcc',
                    },
                },
                axisLabel:{
                    formatter : function(params){
                        return dateFormat0(+params,'MM月');
                    },
                    interval:60,
                },
                axisTick:{
                    length:0,
                },
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                show:false,
            },
            series: [
                {
                    name:'Price',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: '#fff',
                        }
                    },
                    lineStyle:{
                        width:1,
                    },
                    data: data1
                }
            ]
        };

        function setChartData(data){
            let {price_usd,market_cap_by_available_supply}=data;
            let arr=price_usd.map((item,index)=>(item[1]));
            let minIndex=arr.indexOf(Math.min.apply(null,arr));
            let maxIndex=arr.indexOf(Math.max.apply(null,arr));

            for(let i=0;i<price_usd.length;i++){
                date.push(price_usd[i][0]);
                data1.push(price_usd[i][1]);
            }

            myChart.setOption(option);
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: maxIndex,
            });
        };

        if(this.props.useCache){
            setChartData(lineData);
        }else{
            getYearDate(this.json,(res)=>{
                setChartData(JSON.parse(res.data));
            });
        }
    }

    render(){
        const {lineData}=this.state;

        return(
            <div  className="Chartview">
                <div className="dataWrap">
                    <h3>{getDecimal(lineData.value)} USDT</h3>
                    <h4>{dateFormat0(+lineData.date,'yyyy.MM.dd hh:mm')}</h4>
                </div>

                <div ref={(dom)=>{this.chartview=dom}} className="cartviewWrap"></div>
            </div>
        )
    }
}