import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browser} from 'src';
import {Link} from 'react-router-dom';
import { autobind } from 'core-decorators';
import {uploadImage} from 'services';
import API from 'services/index1';
import {lStore} from 'js/yydjs';
import './style.scss';

@autobind
export default class UserInfor extends Component {
    static props = {
        src:PropTypes.string.isRequired,
        infor: PropTypes.array.isRequired,
        toUrl : PropTypes.string,
        upload : PropTypes.bool,
    };

    static defaultProps = {
        src : '',//头像src地址
        infor : [],//个人信息
        /*
          [{
            name:'',//用户名
            id:'',//用户id
          }]
        */
        toUrl : false,//点击头像跳转的地址
        upload : false,//是否开启上传头像
    }

    state = {
        stateSrc : '',
    }

    lUserInfo=lStore.get('userInfor')|| {};


  render() {
    const { src,infor,toUrl,upload } = this.props;
    const {stateSrc} = this.state;
    const lSrc=this.lUserInfo&&this.lUserInfo.src&&this.lUserInfo.src!='undefined'&&this.lUserInfo.src!='null'?this.lUserInfo.src:'';
    const dSrc=require('images/user_img.svg');

        return(
            <div className="user-infor">
                {
                    <div className="user-img">
                        {
                            toUrl&&
                            <Link to={toUrl}></Link>
                        }
                        {
                            upload&&
                            <input onChange={(ev)=>{
                                uploadImage(ev,(res)=>{
                                    if(res.code=='0000'){
                                        const {file} = res.data;
                                        API.EditHeadImg({headImg:file},(resq)=>{
                                          if(resq.code='0000'){
                                            let loginUserName = lStore.get('userInfor');
                                            lStore.set('userInfor',{
                                              headImg:file,
                                              userName:loginUserName.userName
                                            });
                                            this.setState({
                                              stateSrc : file,
                                            });
                                          }
                                        });
                                    }
                                });
                            }} type="file" />
                        }
                        <img src={(stateSrc||src||lSrc)?(stateSrc||src||lSrc)+'?x-oss-process=image/auto-orient,1':dSrc} alt="头像" />
                    </div>
                }
                {
                    infor.map((row,index)=>{
                        return (
                            <ul className="infor"  key={index}>
                                <li>{row.name}</li>
                                <li>{row.id}</li>
                            </ul>
                        )
                    })
                }
            </div>
        )
    }
}
