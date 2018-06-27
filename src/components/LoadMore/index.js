import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import DefaultImage from 'components/DefaultImage';
import {Link} from 'react-router-dom';
import {Type,bind,unbind,getStyle,QSA} from 'js/yydjs';
import './style.scss';

@autobind
export default class LoadMore extends React.Component{
    static propTypes={
        api:PropTypes.func.isRequired,
        json:PropTypes.object,
        firstLoad:PropTypes.func,
        parent:PropTypes.object.isRequired,
        stateName:PropTypes.string.isRequired,
        state:PropTypes.array.isRequired,
        dom:PropTypes.any,
        onLoad:PropTypes.func,
    }

    static defaultProps={
        api:null,//请求的api接口（必填）
        json:{},//定义api的json参数
        firstLoad:()=>{},//第一次请求接口成功的回调
        parent:null,//父组件的this（必填）
        stateName:'',//父组件列表数组的state名字（必填）
        state:[],//父组件列表数组的state（必填）
        dom:null,//父组件列表的dom节点（必填）
        onLoad:()=>{},//加载时触发的函数
    }

    /*
        <LoadMore
            api={queryNoticePage}
            parent={this}
            stateName="dataList"
            state={dataList}
            dom={this.ExchangeNotice}
        />
    */

    constructor(props){
        super(props);
        this.state={
            loadState:'',
        };

        this.json={
            page:0,
            pageSize:10,
        };
        this.onOff=true;
        this.finished=false;
    }

    componentDidMount(){
        if(this.props.json){
            for(let attr in this.props.json){
                this.json[attr]=this.props.json[attr];
            }
        }

        //获取列表数据
        this.getDataList();
        bind(document,'scroll',this.pullLoad);
    }

    componentWillUnmount(){
        unbind(document,'scroll',this.pullLoad);
    }

    pullLoad(){
        let pageHeight=QSA('#root')[0].offsetHeight||parseInt(getStyle(QSA('#root')[0],'height'));
        let currenPos=document.documentElement.clientHeight+(document.documentElement.scrollTop||document.body.scrollTop)+50;

        if(!this.finished&&this.onOff&&currenPos>pageHeight){
            this.onOff=false;
            this.setState({
                loadState:'loading',
            });
            this.getDataList();
        }
    }

    getDataList(endFn){
        let {parent,stateName}=this.props;
        let arr=[];

        this.json.page++;

        this.props.api(this.json,(res)=>{
            this.onOff=true;
            arr=[].concat(parent.state[stateName],Type(res.data)=='array'?res.data:res.data.dataList);

            parent.setState({
                [stateName]:arr,
            });
            this.setState({
                loadState:'',
            });

            if(arr.length<this.json.pageSize||this.json.page*this.json.pageSize>=(res.data.rows||+Infinity)){
                this.finished=true;
                if(arr.length>this.json.pageSize){
                    this.setState({
                        loadState:'finished',
                    });
                }
            }
            if(this.json.page==1)this.props.firstLoad&&this.props.firstLoad(res);
            endFn&&endFn(res);
            this.props.onLoad&&this.props.onLoad(res);
        })
    }

    render(){
        const {loadState}=this.state;
        const {state}=this.props;

        return(
            <div className={'LoadMore '+(state.length>0?loadState:'')}>
                <span>加载更多</span>
                <span>已经到我底线咯</span>
            </div>
        )
    }
}