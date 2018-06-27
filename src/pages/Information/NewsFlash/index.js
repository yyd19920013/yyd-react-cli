import React from 'react';
import {autobind} from 'core-decorators';
import Container from 'components/Container';
import DefaultImage from 'components/DefaultImage';
import {queryNewsPage} from 'services';
import {dateFormat0,normalDate} from 'js/yydjs';
import './style.scss';

@autobind
export default class NewsFlash extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{},
            dataList:[],
        };

        this.json={
            page:0,
            pageSize:20,
        };
    }

    componentDidMount(){
        //获取快讯列表
        this.getDataList();
    }

    getDataList(){
        let {dataList}=this.state;

        this.json.page++;
        queryNewsPage(this.json,(res)=>{
            this.setState({
                data:res.data[0],
                dataList:[].concat(dataList,res.data[0].lives),
            });
        });
    }

    getWeek(date){
        if(!date)return '';
        let oDate=new Date(normalDate(date));
        let oWeek=oDate.getDay();
        let weekJson={
            0:'星期日',
            1:'星期一',
            2:'星期二',
            3:'星期三',
            4:'星期四',
            5:'星期五',
            6:'星期六',
        };

        oWeek=weekJson[oWeek+''];
        return oWeek;
    }

    render(){
        const {data,dataList}=this.state;

        return(
            <div className="NewsFlash">
                <Container>
                    {
                        dataList.length>0&&
                        <div className="dataWrap">
                            <div className="title">
                                {dateFormat0(data.date,'yyyy/MM/dd')} {this.getWeek(data.date)}
                            </div>

                            <div className="dataList">
                                <ul>
                                    {dataList.map((item,index)=>(
                                        <li key={index}>
                                            <div className="title">
                                                {dateFormat0(+(item.created_at+'000'),'hh:mm')}
                                            </div>
                                            <div className="main">
                                                {item.content}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }

                    <DefaultImage
                        show={!dataList.length}
                    />
                </Container>
            </div>
        )
    }
}