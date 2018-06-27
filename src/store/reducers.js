import {fromJS} from 'immutable';

const initState=fromJS({
    show:false,
});
const initLogin=fromJS({
    login : true,
});

const loading=(state=initState,action)=>{
    switch(action.type){
        case 'LOADINGCONTROL':
                return state.set('show',action.show);
            break;
        default:
            return initState;
    }
};
const isLogin=(state=initLogin,action)=>{
    switch(action.type){
        case 'ISLOGIN':
                return state.set('login',action.login);
            break;
        default:
            return initLogin;
    }
};

export{
    loading,//控制loading
    isLogin,//是否登录
};
