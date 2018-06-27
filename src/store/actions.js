const loadingControl=(bool)=>({
    type:'LOADINGCONTROL',
    show:bool,
});

const isLogin = (bool)=>({
    type:'ISLOGIN',
    login:bool,
});
export{
    loadingControl,//控制loading
    isLogin,//是否登录
};
