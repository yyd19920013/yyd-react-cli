import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import './style.scss';

@autobind
export default class DefaultImage extends React.Component{
    static propTypes={
        show:PropTypes.bool,
        type:PropTypes.string,
        insert:PropTypes.bool,
    }

    static defaultProps={
        show:false,//是否显示缺省页
        type:'0',//缺省页的类型，请在数组中定义
        insert:false,//是否嵌入
    }

    /*
        <DefaultImage
            show={true}
        />
    */

    constructor(props){
        super(props);
        this.defaultArr=[
            {
                url:require('images/icon/icon1.png'),
                hint:'暂无数据',
            },
        ];
    }

    render(){
        const {show,type,insert}=this.props;

        return(
            <div style={{backgroundImage:`url(${this.defaultArr[type].url})`}} className={'DefaultImage'+(insert?' insert':'')+(show?' active':'')}>
                <div className="DefaultImageHint">{this.defaultArr[type].hint}</div>
            </div>
        )
    }
}