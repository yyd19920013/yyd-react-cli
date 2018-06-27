import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import LoadMore from 'components/LoadMore';
import DefaultImage from 'components/DefaultImage';
import {dateFormat1} from 'js/yydjs';
import './style.scss';

@autobind
export default class PullLoadList extends React.Component{
    static propTypes={
        api:PropTypes.func.isRequired,
        json:PropTypes.object,
    }

    static defaultProps={
        api:null,//请求api的接口（必填）
        json:{},//接口传参
    }

    /*
        <PullLoadList
            api={qryArticle}
            json={{
                section:this.search.section,
            }}
        />
    */

    constructor(props){
        super(props);
        this.state={
            dataList:[],
        };

        this.PullLoadList=null;
        this.picFlagJson={
            '0':'noImage',
            '1':'littleImage',
            '2':'bigImage',
        };
    }

    componentDidMount(){

    }

    render(){
        const {api,json}=this.props;
        let {dataList}=this.state;

        return(
            <div ref={(dom)=>{this.PullLoadList=dom}} className="PullLoadList">
                {
                    dataList.length>0&&
                    <ul>
                        {dataList.map((item,index)=>(
                            <li className={this.picFlagJson[item.picFlag]} key={index}>
                                <Link to={`/information/programa_detail?articleId=${item.newsId}`}>
                                    <div className="leftContent">
                                        <div className="title multiLine-2">
                                            {item.title}
                                        </div>

                                        <div className="end">
                                            <span>{dateFormat1(item.publishDate,'yyyy/MM/dd')}</span>
                                            <em>{item.outSourceName}</em>
                                        </div>
                                    </div>
                                    <img style={{backgroundImage:`url(${item.bannerUrl})`}} src={require('images/null.png')} alt="图片" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                }

                <LoadMore
                    api={api}
                    json={json}
                    parent={this}
                    stateName="dataList"
                    state={dataList}
                    dom={this.PullLoadList}
                />

                <DefaultImage
                    show={!dataList.length}
                />
            </div>
        )
    }
}