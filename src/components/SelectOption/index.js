import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import {bind,unbind} from 'js/yydjs';
import selectArr from './selectArr';
import './style.scss';

@autobind
export default class SelectOption extends React.Component{
    static propTypes={
        defaultSelect:PropTypes.func,
        selectList:PropTypes.func,
        lIconName:PropTypes.string,
        rIconName:PropTypes.string,
        update:PropTypes.func,
    }

    static defaultProps={
        defaultSelect:()=>(<div>默认选项</div>),//默认选项，在函数里返回jsx或字符串
        selectList:()=>([<div>选项1</div>,<div>选项2</div>]),//默认选项，在函数里返回的数组，数组里是jsx或者字符串
        lIconName:'',//左边icon的图标名字
        rIconName:'icon-ICONCopy',//右边icon的图标名字
        update:()=>{},//选择select触发的函数，返回参数1、选中的innerText，2、jsx上data的数据或dom，3、选中的索引值
    }

    //如果想返回选项的更多数据，可以在jsx元素上传入data属性，然后用JSON.stringify序列化，选中时会返回该数据的JSON.parse形式
    /*
        <SelectOption
            defaultSelect={()=>{
                return(
                    <div className="select">
                        选择银行
                    </div>
                );
            }}
            selectList={()=>{
                return selectList.map((item,index)=>(
                    <div className="option" data={JSON.stringify(item)}>
                        {item.text}
                    </div>
                ));
            }}
            update={(text,item,index)=>{
                console.log(text,item,index);
            }}
        />
    */

    constructor(props){
        super(props);
        this.state={
            defaultValue:'',
            showList:false,
            currentIndex:-1,
        };

        this.SelectOption=null;
        selectArr.push(this);
    }

    componentDidMount(){
        bind(document,'click',this.dClickClose);
    }

    componentWillUnmount(){
        if(selectArr.length)selectArr.splice(0,selectArr.length);

        unbind(document,'click',this.dClickClose);
    }

    dClickClose(ev){
        let {target}=ev;

        if(!this.SelectOption.contains(target)){
            this.closeAll();
        }
    }

    closeAll(){
        for(let This of selectArr){
            This.setState({
                showList:false,
            });
        }
    }

    selectOption(ev,item,index){
        let dom=ev.currentTarget.children[0]||ev.currentTarget;
        let data=dom.getAttribute('data');

        this.props.update&&this.props.update(dom.innerText,data?JSON.parse(data):dom,index);

        this.setState({
            defaultValue:item,
            showList:false,
            currentIndex:index,
        });
    }

    toggleSelect(){
        this.closeAll();

        if(!this.state.showList){
            this.setState({
                showList:true,
            });
        }
    }

    render(){
        const {defaultValue,showList,currentIndex}=this.state;
        let {defaultSelect,selectList,lIconName,rIconName}=this.props;

        defaultSelect=defaultValue||defaultSelect();
        selectList=selectList();

        return(
            <div ref={(dom)=>{this.SelectOption=dom}} className="SelectOption">
                <div onClick={this.toggleSelect} className={'defaultSelect overflow'+(lIconName?' lIcon':'lIcon')}>
                    <i className={'lIcon iconfont '+(lIconName?lIconName:'')}></i>
                    {defaultSelect}
                    <i className={'rIcon iconfont '+(rIconName?rIconName:'')}></i>
                </div>

                <ul className={'selectList '+(showList?' active':'')}>
                    {selectList.map((item,index)=>(
                        <li onClick={(ev)=>{this.selectOption(ev,item,index)}} className={index==currentIndex?'active':''} key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}