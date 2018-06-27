import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import LoadMore from 'components/LoadMore';
import DefaultImage from 'components/DefaultImage';
import {cancelWidthdrawApply} from 'services';
import {getDecimal,shortDate,colorPrice,toast,Type,bind,unbind,getPos,getStyle} from 'js/yydjs';
import './style.scss';

@autobind
export default class TableList extends React.Component{
    static propTypes={
        api:PropTypes.func,
        json:PropTypes.object,
        firstLoad:PropTypes.func,
        dataList:PropTypes.array.isRequired,
        defineList:PropTypes.array.isRequired,
        type:PropTypes.string,
        onLoad:PropTypes.func,
    }

    static defaultProps={
        api:()=>{},//定义接口，是一个函数，函数第一个参数接收json，第二个参数为callback函数
        json:{},//定义api的json参数
        firstLoad:()=>{},//第一次请求接口成功的回调
        dataList:[],//数据列表
        defineList:[],//数据列表定义
        /*
            {
                title:'姓名',//列表的key名称
                key:'name',//取值对应的dataList字段名称
                format:'price',//格式化类型
            }
        */
        type:'',//特殊样式名，有fundList（资金流水，不分正负），style1（样式和资金流水一样，有分正负）
        onLoad:()=>{},//加载时触发的函数
    }

    /*
        <TableList
            dataList={[
                {
                    name:'张三',
                    age:20,
                    sex:'男',
                },
                {
                    name:'李四',
                    age:21,
                    sex:'男',
                },
                {
                    name:'丽丽',
                    age:20,
                    sex:'女',
                },
            ]}
            defineList={[
                {
                    title:'姓名',
                    key:'name',
                },
                {
                    title:'年龄',
                    key:'age',
                },
                {
                    title:'性别',
                    key:'sex',
                }
            ]}
            onLoad={()=>{
                console.log('加载了');
            }}
        />
    */

    constructor(props){
        super(props);
        this.state={
            DataList:[],
            rows:'',
            loadState:'',
            minHeight:'',
        };

        this.formatJson={
            price:getDecimal,//金额格式化
            date:shortDate,//短日期格式化
            colorPrice,//红负绿正金额格式化
        };
        this.statusJson={
            0:'待审核',
            1:'转账中',
            2:'已拒绝',
            3:'成功',
            4:'撤销',
        };
        this.TableList=null;
    }

    componentDidMount(){
        this.setMinHeight();
        bind(window,'resize',this.setMinHeight);
    }

    componentWillUnmount(){
        unbind(window,'resize',this.setMinHeight);
    }

    setMinHeight(){
        this.setState({
            minHeight:document.documentElement.clientHeight-getPos(this.TableList,'top')+1,
        });
    }

    render(){
        let {api,json,dataList,defineList,type,firstLoad,onLoad}=this.props;
        let {DataList,minHeight}=this.state;

        if(api)dataList=DataList;

        return(
            <div ref={(dom)=>{this.TableList=dom}} className={'TableList '+(type?type:'')}>
                {
                    dataList.length>0&&
                    <div style={{minHeight:DataList.length>=10?minHeight:0}} className="dataWrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    {defineList.map((item,index)=>(
                                        <th key={index}>{item.title}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {dataList.map((item,index)=>(
                                    <tr key={index}>
                                        {defineList.map((item1,index1)=>{
                                            let getVal=(index='')=>{
                                                let val=item[item1['key'+index]];

                                                if(item1['format'+index]=='colorPrice'&&type!='fundList'){//type类型不为特定都乘上flowType
                                                    val=item[item1['key'+index]]*(item.flowType||1);
                                                }

                                                return val;
                                            };
                                            let val=getVal();
                                            let val1=getVal(1);

                                            return(
                                                <td
                                                    className={(function(){
                                                        let className='';

                                                        if(item1.format=='colorPrice'){
                                                            if(type!='fundList'){//type类型不为特定都乘上flowType
                                                                className=+item[item1.key]*(item.flowType||1)>0?'green':'red';
                                                            }else{
                                                                className=+item[item1.key]>0?'green':'red';
                                                            }
                                                        }
                                                        return className;
                                                    }())}
                                                    key={index1}
                                                >
                                                    {
                                                        item1.format||item1.format1?//格式化判断
                                                        (
                                                            item1.key1?//是否有两个key判断
                                                            <div className="doubleKey">
                                                                {
                                                                    item1.format?//判断第一个format是否存在
                                                                    <h3>{this.formatJson[item1.format](val)}</h3>
                                                                    :
                                                                    <h3>{item[item1.key]}</h3>
                                                                }
                                                                {
                                                                    item1.format1?//判断第二个format是否存在
                                                                    <h3>{this.formatJson[item1.format1](val1)}</h3>
                                                                    :
                                                                    <h3>{item[item1.key1]}</h3>
                                                                }
                                                            </div>
                                                            :
                                                            this.formatJson[item1.format](val)
                                                        )
                                                        :
                                                        (
                                                            item1.key=='status'?//状态判断
                                                            (
                                                                item[item1.key]==0?//撤销显示
                                                                <span className="status">
                                                                    <b onClick={(ev)=>{
                                                                        cancelWidthdrawApply({id:item.id},(res)=>{
                                                                            toast('撤销提现申请成功',true);
                                                                            DataList[index].status=4;
                                                                            this.setState({
                                                                                DataList,
                                                                            });
                                                                        });
                                                                    }}>撤销</b>
                                                                    {this.statusJson[item[item1.key]+'']}
                                                                </span>
                                                                :this.statusJson[item[item1.key]+'']
                                                            )
                                                            :
                                                            (
                                                                item1.key1?//是否有两个key判断
                                                                <div className="doubleKey">
                                                                    <span>{item[item1.key]}</span>
                                                                    <span>{item[item1.key1]}</span>
                                                                </div>
                                                                :
                                                                item1.key=='realName'?
                                                                (item[item1.key].length>4&&'***'+item[item1.key].substring(item[item1.key].length-4))
                                                                :
                                                                item[item1.key]
                                                            )
                                                        )
                                                    }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

                <LoadMore
                    api={api}
                    json={json}
                    parent={this}
                    stateName="DataList"
                    state={DataList}
                    dom={this.TableList}
                    firstLoad={firstLoad}
                    onLoad={onLoad}
                />

                <DefaultImage
                    show={!dataList.length}
                />
            </div>
        )
    }
}