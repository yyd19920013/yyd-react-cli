import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {getDecimal} from 'js/yydjs';
import {Link} from 'react-router-dom';
import moment from 'moment';
import API from 'services/index1';
import './style.scss';
@autobind
export default class HistoryOrder extends React.Component{
    static props = {
        orderList : PropTypes.array,
    }
    static defaultProps = {
        orderList : []
    }
    state = {
        orderData : []
    }
    componentDidMount() {
        if(this.props.orderList) {
            this.setState({
                orderData : this.props.orderList
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.orderList != nextProps.orderList) {
            this.setState({
                orderData : nextProps.orderList
            })
        }
    }

    render(){
        const {orderData} = this.state;
        return(

            <div className="history-order">
                {
                    orderData.length>0
                    ?
                    orderData.map((item,index)=>{
                        return (
                            <div key={index} className="order-item">
                                <Link to={{pathname: '/exponent/history_order/order_detail', search: '?detail='+(JSON.stringify(item))}}>
                                    <div className="order-title">
                                        <div className="order-type">
                                            {
                                                item.type == 1
                                                ?
                                                    <h2 className='buy'>购买USDT</h2>
                                                :
                                                    <h2 className='sell'>售出USDT</h2>

                                            }
                                            <span className='order-time'>{moment(item.createTime).format("YYYY-MM-DD HH:mm")}</span>
                                        </div>
                                        <div className="order-state">
                                            {
                                               item.status == 3
                                               ?
                                                   <span className='success'>成功</span>
                                               :
                                                   <span className='fail'>失败</span>
                                            }
                                            <i className="arrow"></i>
                                        </div>
                                    </div>
                                    <ul className="order-list">
                                        <li>
                                            <span className='label'>订单金额</span>
                                            <span className='label-val'>￥{getDecimal(item.totalAmount)}</span>
                                        </li>
                                        <li>
                                            <span className='label'>价格</span>
                                            <span className='label-val'>{getDecimal(item.rate)}CNY</span>
                                        </li>
                                        <li>
                                            <span className='label'>数量</span>
                                            <span className='label-val'>{getDecimal(item.amount)} USDT</span>
                                        </li>
                                    </ul>
                                </Link>
                            </div>
                        )
                    })
                        :
                        <div className="no-data">
                            <span className="iconfont icon-B-Copy2"></span>
                            <div className="txt">暂无订单记录</div>
                        </div>
                }
            </div>
        )
    }
}