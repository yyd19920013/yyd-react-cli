import React from 'react';
import {autobind} from 'core-decorators';
import Header from 'components/Header';
import Container from 'components/Container';
import {queryNoticeDetail} from 'services';
import {dateFormat0,strToJson} from 'js/yydjs';
import './style.scss';

@autobind
export default class ExchangeNoticeDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:'',
        };

        this.json={
            id:strToJson().id,
        };
    }

    componentDidMount(){
        //获取公告详情
        (function(This){
            queryNoticeDetail(This.json,(res)=>{
                This.setState({
                    data:res.data,
                });
            });
        }(this));
    }

    render(){
        const {data}=this.state;

        return(
            <div className="ExchangeNoticeDetail">
                <Header
                    title="公告详情"
                />

                <Container>
                    {
                        data&&
                        <div className="dataWrap">
                            <div className="title">
                                <h3>{data.title}</h3>
                                <h4>{data.exchange_name}</h4>
                            </div>

                            <div className="hint">
                                {dateFormat0(+(data.posted_at+'000'),'yyyy/MM/dd hh:mm:ss')}发布，内容以
                                <a href={data.link}>原文链接</a>
                                为准
                            </div>

                            <div dangerouslySetInnerHTML={{__html:data.content}} className="htmlWrap"></div>
                        </div>
                    }
                </Container>
            </div>
        )
    }
}