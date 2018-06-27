import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {Link} from 'react-router-dom';
import {getDecimal} from 'js/yydjs';
import './style.scss';

@autobind
export default class CashAccount extends React.Component{
    static propTypes={
        unit:PropTypes.string,
        count:PropTypes.number,
        to:PropTypes.string,
    }

    static defaultProps={
        unit:'',//单位
        count:0,//数额
        to:'',//跳转地址
    }

    /*
        <CashAccount
            unit={userInfo.unit}
            count={userInfo.count}
            to="/account/balance"
        />
    */

    render(){
        const {unit,count,to}=this.props;

        return(
            <div className="CashAccount">
                {to&&<Link to={to}></Link>}
                <h3>现金账户（{unit}）</h3>
                <h4>{getDecimal(count)}</h4>
            </div>
        )
    }
}