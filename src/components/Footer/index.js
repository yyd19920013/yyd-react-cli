import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {NavLink} from 'react-router-dom';
import './style.scss';

@autobind
export default class Footer extends React.Component{
    static propTypes={
        dataList:PropTypes.arrayOf(PropTypes.object),
    }

    static defaultProps={
        dataList:[{//要展示在Footer的数据
            name:'底部导航',//显示的文字
            to:'123',//跳转的地址
        }],
    }

    /*
        <Footer
            dataList={[
                {
                    name:'资讯',
                    to:'/information/index',
                },
                {
                    name:'行情',
                    to:'/exponent',
                },
                {
                    name:'推广',
                    to:'/popularize',
                },
                {
                    name:'我的',
                    to:'/account/personal_center',
                },
            ]}
        />
    */

    render(){
        const {dataList}=this.props;

        return(
            <div className="Footer">
                {dataList.map((item,index)=>{
                    return(
                        <NavLink activeClassName="active" key={index} to={item.to?item.to:'/'}>
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </div>
        )
    }
}
