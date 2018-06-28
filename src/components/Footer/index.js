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
            iconName:'icon-B-3',//icon的名字
            to:'123',//跳转的地址
        }],
    }

    /*
        <Footer
            dataList={[
                {
                    name:'账户',
                    iconName:'icon-B-3',
                    to:'123',
                },
                {
                    name:'指数',
                    iconName:'icon-A-4',
                    to:'1234',
                },
                {
                    name:'推广',
                    iconName:'icon-A-1',
                    to:'12345',
                },
                {
                    name:'数据',
                    iconName:'icon-A-6',
                    to:'123456',
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
                            <i className={'iconfont '+(item.iconName?item.iconName:'')}></i>
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </div>
        )
    }
}
