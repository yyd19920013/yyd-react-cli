import React from 'react';
import {autobind} from 'core-decorators';
import Header from 'components/Header';
import Container from 'components/Container';
import {strToJson,dateFormat1} from 'js/yydjs';
import {qryArticleDetail} from 'services';
import './style.scss';

@autobind
export default class ProgramaDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
        };

        this.search=strToJson();
    }

    componentDidMount(){
        //获取文章详情
        this.getDetail();
    }

    getDetail(){
        qryArticleDetail({articleId:this.search.articleId},(res)=>{
            this.setState({
                detail:res.data,
            });
        });
    }

    render(){
        const {detail}=this.state;

        return(
            <div className="ProgramaDetail">
                <Header
                    title="详情"
                />

                <Container>
                    <div className="dataWrap">
                        <div className="title">
                            {detail.title}
                        </div>

                        <div className="subhead">
                            <span>{detail.publishDate&&dateFormat1(detail.publishDate)}</span>
                            <em>{detail.outSourceName}</em>
                            <b>{detail.initReadCount+detail.realReadCount||0}阅读</b>
                        </div>

                        <div
                            dangerouslySetInnerHTML={{
                                __html:detail.content,
                            }}
                            className="sectionWrap"
                        >
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}