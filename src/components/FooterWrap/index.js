import React from 'react';
import {autobind} from 'core-decorators';
import Footer from 'components/Footer';
import {userInfo} from 'services';
import {sStore} from 'js/yydjs';
import './style.scss';

@autobind
export default class FooterWrap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataList:[
                {
                    name:'账户',
                    iconName:'icon-B-3',
                    to:'/account',
                },
                {
                    name:'指数',
                    iconName:'icon-A-4',
                    to:'/exponent/buy_usdt',
                },
                {
                    name:'推广',
                    iconName:'icon-A-1',
                    to:'/popularize',
                },
                {
                    name:'数据',
                    iconName:'icon-A-6',
                    to:'/data',
                },
            ],
        };
    }

    render(){
        const {dataList}=this.state;

        return(
            <div className="FooterWrap">
                <Footer
                    dataList={dataList}
                />
            </div>
        )
    }
}
