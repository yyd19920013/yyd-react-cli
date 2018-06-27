state = {
  src : require('images/user_img.svg'),
  infor : [name : 'xxxx',id:'xxxxx'],//这是后台的接口获取的字段，等接口拿到了再做调整
}

<UserImg src={src} />
<UserInfor src={src} infor={infor} />
