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
                    name:'资讯',
                    to:'/information/index',
                },
                {
                    name:'行情',
                    to:'/market',
                },
                {
                    name:'推广',
                    to:'/popularize',
                },
                {
                    name:'我的',
                    to:'/account/personal_center',
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
