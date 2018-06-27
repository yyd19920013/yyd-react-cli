import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {limitLength,amountType} from 'js/yydjs';
import './style.scss';

@autobind
export default class UnitInput extends React.Component{
    static propTypes={
        parent:PropTypes.object.isRequired,
        state:PropTypes.string.isRequired,
        value:PropTypes.any.isRequired,
        type:PropTypes.string,
        format:PropTypes.string,
        amount : PropTypes.string,
        placeholder:PropTypes.string,
        name:PropTypes.string,
        unit:PropTypes.string,
        errorHint:PropTypes.bool,
        showClear:PropTypes.bool,
        onChange:PropTypes.func,
        onBlur:PropTypes.func,
    }

    static defaultProps={
        parent:null,//父组件的this（必填）
        state:'',//父组件控制该input值的state名字，字符串（必填）
        value:'',//父组件控制该input值的state名字，本身（必填）
        type:'text',//input类型
        format:'',//对输入进行格式化
        placeholder:'',//提示语
        name:'',//字段名称
        unit:'',//单位
        errorHint:false,//红框提示
        showClear:false,//是否显示清除按钮
        onChange:()=>{},//onChange事件回调函数
        onBlur:()=>{},//onBlur事件回调函数
    }

    /*
        <UnitInput
            parent={this}
            state={'withdraw'}
            value={withdraw}
            type="number"
            placeholder="输入提现金额"
            name="购买数量"
            unit="USDT"
            errorHint={false}
            onChange={(ev)=>{console.log(ev)}}
        />
    */

    constructor(props){
        super(props);
        this.formatJson={
            price:(value)=>{//限制金额小数位最大为2位数
                return limitLength(value,2);
            },

        };
    }

    changeValue(ev){
        let value=ev.currentTarget.value;
        let {format}=this.props;
        let {amount}=this.props;
        let {formatJson}=this;
        let {amountJson}=this;

        this.props.parent.setState({
            [this.props.state]:format&&this.formatJson[format]?this.formatJson[format](value):value,
        });
        this.props.onChange&&this.props.onChange(ev);
    }

    clearValue(){
        this.props.parent.setState({
            [this.props.state]:'',
        });
    }
    blur(e) {
      this.props.onBlur&&this.props.onBlur(e.target.value);
    }
    render(){
        const {value,type,placeholder,name,unit,errorHint,showClear,onChange,onBlur}=this.props;

        return(
            <div className={'UnitInput'+(name?' name':'')+(unit?' unit':'')+(errorHint?' errorHint':'')}>
                {
                    name&&
                    <em>{name}</em>
                }
                <input
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    onChange={(ev)=>{this.changeValue(ev)}}
                    onBlur={(ev)=>{this.blur(ev)}}
                />
                {
                    showClear&&
                    <i onClick={this.clearValue} className="iconfont icon-B-Copy6"></i>
                }
                {
                    unit&&
                    <span>{unit}</span>
                }
            </div>
        )
    }
}
