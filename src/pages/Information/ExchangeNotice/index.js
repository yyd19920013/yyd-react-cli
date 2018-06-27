import React from 'react';
import {autobind} from 'core-decorators';
import {Link} from 'react-router-dom';
import Container from 'components/Container';
import LoadMore from 'components/LoadMore';
import DefaultImage from 'components/DefaultImage';
import {queryNoticePage} from 'services';
import {dateFormat0} from 'js/yydjs';
import './style.scss';

@autobind
export default class ExchangeNotice extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataList:[],
        };

        this.ExchangeNotice=null;
    }

    componentDidMount(){

    }

    render(){
        const {dataList}=this.state;

        return(
            <div ref={(dom)=>{this.ExchangeNotice=dom}} className="ExchangeNotice">
                <Container>
                    <div className="dataWrap">
                        {
                            dataList.length>0&&
                            <ul className="dataList">
                                {dataList.map((item,index)=>(
                                    <li key={index}>
                                        <Link to={`/information/exchange_notice_detail?id=${item.id}`}>
                                            <img style={{backgroundImage:`url(${item.logo})`}} src={require('images/null.png')} alt="图标"/>
                                            <div className="right">
                                                <h3>{item.title}</h3>
                                                <span>{dateFormat0(+(item.posted_at+'000'))}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        }

                        <LoadMore
                            api={queryNoticePage}
                            parent={this}
                            stateName="dataList"
                            state={dataList}
                            dom={this.ExchangeNotice}
                        />

                        <DefaultImage
                            show={!dataList.length}
                        />
                    </div>
                </Container>
            </div>
        )
    }
}