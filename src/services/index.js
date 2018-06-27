import {ajax,alerts,Type,sStore,lStore,customEvent,strToJson} from 'js/yydjs';
import store from 'store';
import md5 from 'md5';
import {browser} from 'src';
import * as actions from 'store/actions';

let URL='/app/http';

//对项目返回参数的处理，对ajax的再次封装
const ajaxWrap=function(json){
    let oldPathname=browser.location.pathname;
    let noLoginArr=[
                    {
                        path:'/login',//登录
                    },
                    {
                        path:'/account',//首页
                        exact:true,
                    },
                    {
                        path:'/account/personal_center',//我的
                        exact:true,
                    },
                    {
                        path:'/exponent',//指数
                        exact:true,
                    },
                    {
                        path:'/information',//资讯
                    },
                    {
                        path:'/popularize',//推广
                        exact:true,
                    },
                    {
                        path:'/data',//数据
                        exact:true,
                    },
                    {
                        path:'/article_info',//展示文章
                    },
                    {
                        path:'/activity_center',//活动中心
                    },
                    {
                        path:'/advance',//进阶必备
                    },
                ];
    let sign='';
    let token=lStore.get('token');

    for(let attr in json.data){
        sign+=json.data[attr];
    }
    sign=md5(sign+'0123456789');

    ajax({
        url:json.url,
        type:json.type,
        data:json.data,
        closeToForm:json.closeToForm,
        dataType:json.dataType,
        headers:json.headers||{sign,token},
        xhr:json.xhr,
        progress:json.progress,
        before:function(xhr){
            //loading显示处理
            store.dispatch(actions.loadingControl(true));
        },
        after:function(xhr){
            //loading隐藏处理
            store.dispatch(actions.loadingControl(false));
        },
        success:function(res){
            let pathname=browser.location.pathname;

            if(oldPathname!=pathname)return;//解决卸载组件后调用setState报错

            //只要成功都会走
            json.finally&&json.finally(res);

            //成功code已经失败code处理
            if(Type(res)=="object"){
                if(res.code=='0000'){
                    json.success&&json.success(res);
                    return;
                }else if(res.code=='CRM00001'||res.code=='CRM00002'||res.code=='CRM00003'){
                    //嵌入app页面未登录处理
                    if(strToJson().insertApp){
                        window.location.href='gopage://login';
                    }

                    let redirect=true;
                    for(let value of noLoginArr){
                        if(value.exact){
                            if(pathname==value.path){
                                redirect=false;
                                break;
                            }
                        }else{
                            if(pathname.match(value.path)){
                                redirect=false;
                                break;
                            }
                        }
                    }

                    if(redirect){
                        customEvent.emit('needLogin');
                    }
                    return;
                }else if(res.msg){
                    if(res.code!='U0029'){
                        alerts(res.msg);
                    }
                    return;
                }
                alerts("网络异常");
            }
        },
        error:function(error){
            alerts("网络异常");
            store.dispatch(actions.loadingControl(false));
        },
    });
};

const demoApi=function(json,endFn){
    ajaxWrap({
        url:URL+'/pay/listWallet',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};


const uploadOSS=function(json,endFn){
    ajaxWrap({
        url:URL+'/uploadOSS',
        type:'post',
        data:json,
        closeToForm:true,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const uploadImage=function(ev,endFn,index){
    let file=ev.currentTarget.files[0];
    let formData=new FormData();

    if(file){
        formData.append('file',file);
        uploadOSS(formData,(res)=>{
            alerts('上传图片成功',true);
            endFn&&endFn(res,index);
        });
    }
}

const bankList=function(endFn){
    ajaxWrap({
        url:URL+'/crm/bank/list',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const userInfo=function(endFn,finallyFn){
    ajaxWrap({
        url:URL+'/crm/user/info',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            sStore.set('userInfo',res.data);
            endFn&&endFn(res);
        },
        finally:function(res){
            finallyFn&&finallyFn(res);
        },
    });
};

const logout=function(endFn){
    ajaxWrap({
        url:URL+'/crm/user/logout',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const bindBank=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/user/bindBank',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const unbindBank=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/user/unbindBank',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const realAuth=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/user/realAuth',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const realVerify=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/user/realVerify',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const editPassword=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/user/editPassword',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const fundInfo=function(endFn){
    ajaxWrap({
        url:URL+'/crm/fund/info',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const activatePromoter=function(endFn){
    ajaxWrap({
        url:URL+'/crm/promote/activatePromoter',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const findPromoteDayDataForToday=function(endFn){
    ajaxWrap({
        url:URL+'/crm/promote/findPromoteDayDataForToday',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const findPromoteSummaryDataForToday=function(endFn){
    ajaxWrap({
        url:URL+'/crm/promote/findPromoteSummaryDataForToday',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const commisionWidthdrawApply=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/promote/commisionWidthdrawApply',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const cancelWidthdrawApply=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/promote/cancelWidthdrawApply',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const listBrancherSummaryData=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/promote/listBrancherSummaryData',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const listBrancherSummaryInfo=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/promote/listBrancherSummaryInfo',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const findBalanceCommisionFlowPage=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/promote/findBalanceCommisionFlowPage',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const queryCommisionIoPage=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/promote/queryCommisionIoPage',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const findCommisionFlowPage=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/promote/findCommisionFlowPage',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const queryFundFlowPage=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/fund/queryFundFlowPage',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const findPromoteData=function(endFn){
    ajaxWrap({
        url:URL+'/crm/promote/findPromoteData',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const listBrancherTradeSummaryInfo=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/promote/listBrancherTradeSummaryInfo',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};


const queryNewsPage=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/notice/queryNewsPage',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const queryNoticePage=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/notice/queryNoticePage',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const queryNoticeDetail=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/notice/queryNoticeDetail',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const getYearDate=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/market/getYearDate',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const qryAllNewSection=function(endFn){
    ajaxWrap({
        url:URL+'/crm/tagAndOthers/qryAllNewSection',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const qryArticle=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/NewsArticle/qryArticle',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const qryArticleDetail=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/NewsArticle/qryArticleDetail',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const getBannerList=function(endFn){
    ajaxWrap({
        url:URL+'/crm/tagAndOthers/getBannerList',
        type:'post',
        data:'',
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

const getBannerDetail=function(json,endFn){
    ajaxWrap({
        url:URL+'/crm/tagAndOthers/getBannerDetail',
        type:'post',
        data:json,
        dataType:'json',
        success:function(res){
            endFn&&endFn(res);
        },
    });
};

export{
    demoApi,//获取数据示例
    uploadOSS,//上传图片到OSS
    uploadImage,//对上传图片的封装
    bankList,//获取银行列表
    userInfo,//获取用户信息
    logout,//退出登录
    bindBank,//绑定银行卡
    unbindBank,//解绑银行卡
    realAuth,//实名认证姓名身份证
    realVerify,//实名认证身份证正反面
    editPassword,//修改密码
    fundInfo,//获取资金信息
    activatePromoter,//激活推广员
    findPromoteDayDataForToday,//数据-今日
    findPromoteSummaryDataForToday,//数据-总计
    commisionWidthdrawApply,//佣金提现
    cancelWidthdrawApply,//取消佣金提现
    listBrancherSummaryData,//推广-数据统计
    listBrancherSummaryInfo,//推广-用户列表
    findBalanceCommisionFlowPage,//数据-结算流水
    queryCommisionIoPage,//提现记录
    findCommisionFlowPage,//佣金流水
    queryFundFlowPage,//查询资金流水
    findPromoteData,//查询推广数据
    listBrancherTradeSummaryInfo,//交易人数列表
    queryNewsPage,//快讯接口
    queryNoticePage,//交易所公告接口
    queryNoticeDetail,//查询公告详情
    getYearDate,//获取年度曲线图
    qryAllNewSection,//获取所有栏目列表
    qryArticle,//获取资讯列表
    qryArticleDetail,//获取资讯详情
    getBannerList,//获取轮播图列表
    getBannerDetail,//获取轮播图详情
};
