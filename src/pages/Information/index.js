import React from 'react';
import {autobind} from 'core-decorators';
import {Route,Link,NavLink} from 'react-router-dom';
import RouteIndex from 'components/RouteIndex';
import Header from 'components/Header';
import Headline from './Headline';
import Programa from './Programa';
import ProgramaDetail from './ProgramaDetail';
import NewsFlash from './NewsFlash';
import ExchangeNotice from './ExchangeNotice';
import ExchangeNoticeDetail from './ExchangeNoticeDetail';
import FooterWrap from 'components/FooterWrap';
import {userInfo,qryAllNewSection} from 'services';
import {getStyle,bind,unbind,strToJson,customEvent} from 'js/yydjs';
import {browser} from 'src';
import './style.scss';

@autobind
export default class Information extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hideNav:true,
            navWidth:'100%',
            navList:[],
        };

        this.search=strToJson();
        this.oldPath='/information/index';
        this.fullPath=browser.location.pathname+browser.location.search;
        this.navList=null;
    }

    componentDidMount(){
        //获取用户信息
        (function(This){
            userInfo((res)=>{
                This.setState({
                    userInfo:res.data,
                });
            });
        }(this));

        //获取导航栏栏目
        (function(This){
            qryAllNewSection((res)=>{
                let {data}=res;
                let arr=[];

                if(res.data[0]){
                    arr.push(
                        {
                            name:data[0].name,
                            id:data[0].id,
                            linkTo:'/information/index',
                        },
                    );
                }
                arr.push(
                    {
                        name:'快讯',
                        linkTo:'/information/news_flash',
                    },
                    {
                        name:'交易所公告',
                        linkTo:'/information/exchange_notice',
                    },
                );
                for(let i=1;i<data.length;i++){
                    arr.push({
                        name:data[i].name,
                        id:data[i].id,
                    });
                }

                arr=arr.map((item,index)=>({
                    name:item.name,
                    id:item.id,
                    linkTo:item.linkTo?item.linkTo:`/information/programa?section=${item.id}`,
                }));

                This.setState({
                    navIndex:0,
                    navList:arr,
                });

                customEvent.emit('resAllSectionEnd');

                This.calcNavListWidth();
                bind(window,'resize',This.calcNavListWidth);
            });
        }(this));

        //判断是否显示导航栏
        this.controlNavShow();
    }

    componentDidUpdate(){
        //判断是否显示导航栏
        this.controlNavShow();
    }

    componentWillUnmount(){
        unbind(window,'resize',this.calcNavListWidth);
    }

    controlNavShow(){
        this.fullPath=browser.location.pathname+browser.location.search;

        if(browser.location.pathname!=this.oldPath){
            this.oldPath=browser.location.pathname;

            let arr=['/information/programa_detail','/information/exchange_notice_detail'];
            let hideNav=true;

            for(let value of arr){
                if(browser.location.pathname==value){
                    hideNav=false;
                    break;
                }
            }

            this.setState({
                hideNav,
            });
        }
    }

    calcNavListWidth(){
        if(this.navList&&this.navList.children&&this.navList.children.length){
            let doubleMargin=0;
            let arr=Array.prototype.map.call(this.navList.children,(item,index)=>{
                if(index==0)doubleMargin=parseFloat(getStyle(item,'marginLeft'))*2;

                return parseFloat(getStyle(item,'width'))+doubleMargin;
            });

            let count=eval(arr.join('+'));

            this.setState({
                navWidth:count+doubleMargin+'px',
            });
        }
    }

    render(){
        const {hideNav,navWidth,navList}=this.state;

        return(
            <div className="Information">
                <div className={'infoNav'+(!hideNav?' active':'')}>
                    <div className="scrollWrap">
                        <ol style={{width:navWidth}} ref={(dom)=>{this.navList=dom}}>
                            {navList.map((item,index)=>(
                                <li section={item.id} key={index}>
                                    <Link
                                        to={item.linkTo}
                                        className={(this.fullPath==item.linkTo?' active':'')}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <RouteIndex path="/information" component={Headline} />
                <Route path="/information/programa" component={Programa} />
                <Route path="/information/programa_detail" component={ProgramaDetail} />
                <Route path="/information/news_flash" component={NewsFlash} />
                <Route path="/information/exchange_notice" component={ExchangeNotice} />
                <Route path="/information/exchange_notice_detail" component={ExchangeNoticeDetail} />

                <FooterWrap/>
            </div>
        )
    }
}