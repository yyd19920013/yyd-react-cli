import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import HButton from 'components/HButton';
import {Link} from 'react-router-dom';
import Confirm from 'components/Confirm';
import copy from 'copy-to-clipboard';
import API from 'services/index1';
import store from 'store';
import {alerts,lStore,getDecimal,customEvent,toast} from 'js/yydjs';
import {browser} from 'src';
import Container from 'components/Container';
import moment from 'moment';
import './style.scss';

@autobind
export default class CurrentOrder extends React.Component{
    static props = {
        url : PropTypes.string.isRequire,
        params : PropTypes.object.isRequire,
    }
    static defaultProps = {
        params : {
            page : 1,
            pageSize : 5,
        },
    }
    state = {
        minute : '-',
        seconds : '--',
        dataList : [],
        isCancelOrder : false,
        indexVal : 2,
        rows : 0,
        orderId : '',
        buyCtrl : true,
    }
    constructor(props){
        super(props);
        customEvent.on('startBuy',()=>{
            this.getOrder(this.props.url,this.props.params);
        });
        customEvent.on('startSell',()=>{
            this.getOrder(this.props.url,this.props.params);
        });
    }
    componentDidMount(){
        window.clearInterval(this.time);
        const {url,params} = this.props;
        this.getOrder(url,params);
    }
    componentWillUnmount(){
        window.clearInterval(this.time);
        customEvent.remove('startBuy');
        customEvent.remove('startSell');
    }
    //获取订单列表
    getOrder(url,params){
        API.CustomApi(url,params,(res)=>{
            if(res.code=='0000'){
                const {dataList} = this.state;
                let list = res.data.dataList;
                if(list!=null && list!=''){
                    if(list.length>0){
                        if(list[0].type===1 && list[0].status===1){
                            this.props.buyed(true);
                            this.orderTime = list[0].remainSecond;
                            this.setState({
                                orderId : list[0].orderId
                            });
                            this.timer();
                        }else {
                            if(this.props.buyed){
                                this.props.buyed(false);
                            }
                        }
                        this.setState({
                            dataList:list,
                        });
                    }else {
                        this.props.buyed(false);
                        this.setState({
                            dataList : list
                        });
                    }
                }else{
                    this.props.buyed(false);
                    this.setState({
                        dataList : list
                    });
                }
                if(this.getScrollTop){
                    this.getOrderTop();
                }
                this.getScrollTop = true;
            }
        });
    }
    copy(val) {
        copy(val);
        toast('复制成功',true);
    }
    paymented(id) {
        const {url,params} = this.props;
        API.PayOrder({orderId:id},(res)=>{
            if(res.code=='0000'){
                alerts('您已支付');
                this.setState({
                    dataList : []
                });
                this.getOrder(url,params);
                window.clearInterval(this.time);
                lStore.remove('totalSeconds');
            }
        })
    }
    timer() {
        window.clearInterval(this.time);
        this.time = setInterval(()=>{
            this.orderTime--;
            let {orderTime} = this;
            if(orderTime<=0 || orderTime==null){
                const {orderId} = this.state;
                API.TimeOutOrder({orderId},res=>{
                    if(res.code='0000'){
                        window.clearInterval(this.time);
                        lStore.remove('totalSeconds');
                        lStore.remove('totalSeconds');
                        const {url,params} = this.props;
                        this.getOrder(url,params);
                    }
                });
                this.setState({
                    minute : 0,
                    seconds : '00'
                });
                window.clearInterval(this.time);
                return;
            }
            if(orderTime%60<10){
                this.setState({
                    minute : parseInt(orderTime/60),
                    seconds : '0'+orderTime%60
                });
            }else {
                this.setState({
                    minute : parseInt(orderTime/60),
                    seconds : orderTime%60
                });
            }

        },1000);

    }
    revert(orderId) {
        this.setState({
            isCancelOrder : true,
            orderId,
        })
    }
    cancelOrder() {
        const {orderId} = this.state;
        const {url,params} = this.props;
        API.CancelOrder({orderId},res=>{
            if(res.code='0000'){
                window.clearInterval(this.time);
                lStore.remove('totalSeconds');
                alerts('撤销成功');
                this.getOrder(url,params);
            }
        });
    }
    upload() {
        this.setState({
            indexVal : this.state.indexVal+1
        });
        const {data,url} = this.props;
        const {indexVal,rows,dataList} = this.state;
        let params = {
            pageSize : 5,
            page : indexVal
        }
        if(rows>params.pageSize){
            if(dataList.length>=rows){
                alerts('没有更多历史订单了');
                return;
            }
            this.getOrder(url,params);
        }else {
            alerts('没有更多历史订单')
        }
    };
    getOrderTop(){
        setTimeout(()=>{
            let currentStatus = document.getElementById('currentStatus');
            if(currentStatus){
                document.documentElement.scrollTop = 305;
                document.body.scrollTop = 305;
                // document.body.scrollTop = 320;
            }
        })
    }
    render(){
        const {dataList,isCancelOrder,minute,seconds} = this.state;
        return(
            <div className="order-content">
                {
                    dataList.length <= 0
                        ?
                        <div className="no-data">
                            <span className="iconfont icon-B-Copy2"></span>
                            <div className="txt">暂无订单记录</div>
                        </div>
                        :
                        <div className='order-wrap'>
                            {
                                dataList.map((item,index)=>{
                                    return (

                                        <div key={index} className="order-list" id={index==0?'currentStatus':''}>
                                                <header className="order-header">
                                                    <div className="labels-state">
                                                        <div className='labels'>
                                                            {
                                                                item.type===1
                                                                    ?
                                                                    <span className='buy'>买入USDT</span>
                                                                    :
                                                                    <span className='sell'>出售USDT</span>
                                                            }
                                                            <span className="time">{moment(item.createTime).format("YYYY-MM-DD HH:mm")}</span>
                                                        </div>
                                                        <div className="time-state">
                                                            {
                                                                item.type===1 && item.status===1
                                                                    ?
                                                                    <span className="time"><i className='iconfont icon-shijian'></i>{minute}分{seconds}秒</span>
                                                                    :
                                                                    ''
                                                            }
                                                            {
                                                                item.type == 1 && item.status == 1
                                                                    ?
                                                                    <span className='default-state'>待支付</span>
                                                                    :
                                                                    item.type == 1 && item.status == 2
                                                                        ?
                                                                        <span className='wait-state'>已支付</span>
                                                                        :
                                                                        item.type == -1 && item.status == 1
                                                                            ?
                                                                            <span className='default-state'>匹配中</span>
                                                                            :
                                                                            item.type == -1 && item.status == 2
                                                                                ?
                                                                                <span className='default-state'>待确认</span>
                                                                                :
                                                                                item.type == -1  && item.status == 5
                                                                                    ?
                                                                                    <span className='success-state'>打款中</span>
                                                                                    :
                                                                                    ''

                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="order-detail">
                                                        <div className='order-item'>
                                                            <div className="item">价格 <span className="item-prise">{getDecimal(item.rate)}CNY</span></div>
                                                            <div className="prise-txt">订单金额</div>
                                                        </div>
                                                        <div className='order-item'>
                                                            <div className="item">数量 <span className="item-prise">{getDecimal(item.amount)}USDT</span></div>
                                                            <div className="amount">¥{getDecimal(item.totalAmount)}</div>
                                                        </div>
                                                        {
                                                            item.type===-1 && item.status === 1
                                                                ?
                                                                <HButton type='revert' size='middle' text='撤销' onClick={()=>this.revert(item.orderId)}></HButton>
                                                            :
                                                                ''
                                                        }
                                                    </div>
                                                </header>
                                            {
                                                item.type===1 && item.status===1
                                                    ?
                                                        <div className="order-body">
                                                            <ul className="detail-list">
                                                                <li className="list-item">
                                                                    <span className="labels">收款银行</span>
                                                                    <span className="item">{item.bankName}</span>
                                                                </li>
                                                                <li className="list-item" onClick={()=>this.copy(item.bankCardNum)}>
                                                                    <span className="labels">收款人账号</span>
                                                                    <span className="item account"><i className='iconfont icon-fuzhi'></i>{item.bankCardNum.replace(/(\d{4})(?=\d)/g,"$1 ")}</span>
                                                                </li>
                                                                <li className="list-item">
                                                                    <span className="labels">收款人户名</span>
                                                                    <span className="item">{item.bankAccName}</span>
                                                                </li>
                                                                <li className="list-item">
                                                                    <span className="labels">开户地址</span>
                                                                    <span className="item">{item.bankAddress}</span>
                                                                </li>
                                                                <li className="list-item">
                                                                    <span className="labels">附言</span>
                                                                    <span className="item">{item.bankNote}</span>
                                                                </li>
                                                            </ul>
                                                            {
                                                                item.status == 1 && item.type == 1
                                                                    ?

                                                                    <div className="operate-btn">
                                                                        <HButton type='revert' size="middle" text="撤销" onClick={()=>this.revert(item.orderId)} />
                                                                        <span className='padding'></span>
                                                                        <HButton type='buy' size="middle" text="我已支付" onClick={()=>this.paymented(item.orderId)} />
                                                                    </div>
                                                                    :
                                                                    ''
                                                            }
                                                            <div className="order-operate">
                                                                <dl>
                                                                    <dt>温馨提示</dt>
                                                                    <dd>1、充值金额和实际银行转账金额必须一致，否则充值无法到账。</dd>
                                                                    <dd>2、附言必须填写，否则充值无法到账。</dd>
                                                                </dl>

                                                            </div>

                                                        </div>
                                                    :
                                                    ''
                                            }

                                        </div>
                                    )
                                })
                            }
                        </div>
                }
                <Confirm
                    parent={this}
                    state="isCancelOrder"
                    show={isCancelOrder}
                    title="交易提醒"
                    content={<h1>你确认要撤销订单吗？</h1>}
                    confirm={()=>{this.cancelOrder()}}
                    cancel={()=>{console.log('取消')}}
                    lButton="取消"
                    rButton="确定"
                />
            </div>
        )
    }
}
