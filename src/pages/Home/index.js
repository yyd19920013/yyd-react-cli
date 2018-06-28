import React from 'react';
import {autobind} from 'core-decorators';
import {Switch,Route} from 'react-router-dom';
import {browser} from 'src';
import Information from 'pages/Information';
import Page404 from 'pages/Page404';
import Alert from 'components/Alert';
import {routerChange,QSA,getStyle,lStore,strToJson,customEvent,AddClass,routerMap,getPrevPathname} from 'js/yydjs';
import './style.scss';

@autobind
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            change:false,
            isWechat:false,
            showHint:false,
        };

        this.pathname='';
        this.search=strToJson();

        customEvent.on('needLogin',this.showHint);
    }
    componentWillMount() {

    }
    componentDidMount(){
        //跳转首页
        (function(This){
            if(browser.location.pathname=='/')browser.replace('/boot_page');

            //触发componentDidUpdate钩子，改变body背景
            This.setState({
                change:true,
            });
        }(this));
    }

    componentDidUpdate(){
        //每次页面切换都回到顶部
        (function(This){
            if(This.pathname!=browser.location.pathname){
                This.pathname=browser.location.pathname;
                routerChange();
                This.setState({
                    showHint:false,
                });
                This.hideHint();
            }
        }(this));

        //每次body背景色和container背景色保持一致
        (function(This){
            let oBody=QSA('body')[0];
            let oContainer=QSA('.Container')[0];
            let bg1=oBody&&getStyle(oBody,'backgroundColor');
            let bg2=oContainer&&getStyle(oContainer,'backgroundColor');

            if(bg1!=bg2){
                oBody.style.backgroundColor=bg2;
            }
        }(this));

        //存储路由
        (function(This){
            let blacklist=[];
            let {pathname,search}=browser.location;

            if(!routerMap.length||routerMap.length&&blacklist.indexOf(pathname)==-1&&routerMap[routerMap.length-1]!=pathname){
                routerMap.push(pathname);
            }
        }(this));
    }

    componentWillUnmount(){
        customEvent.remove('needLogin',this.showHint);
    }

    showHint(){
        this.setState({
            showHint:true,
        });
    }

    hideHint(){
        this.setState({
            showHint:false,
        });
    }

    render(){
        const {showHint}=this.state;

        return(
            <div className="Home">
                <Switch>
                    <Route path="/information" component={Information} />
                    <Route path="/*" component={Page404} />
                </Switch>

                <Alert
                    parent={this}
                    state="showHint"
                    show={showHint}
                    title="提醒"
                    content="您还未登录，请先登录"
                    confirm={()=>{
                        browser.push('/login');
                    }}
                    button="确定"
                    maskClose={false}
                />
            </div>
        )
    }
}
