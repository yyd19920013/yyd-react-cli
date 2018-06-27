import React, {Component} from 'react';
import PropTypes from 'prop-types';
import API from 'services/index1';
import { autobind } from 'core-decorators';

@autobind
export default class HTable extends Component {
  static props = {
    url : PropTypes.string.isRequired,
    data : PropTypes.array.isRequired,
  }
  state = {
    arr: [],
    income : null,
    params : {
      page : 1,
      pageSize : 20
    },
    noData : true,
    res : [
      {
        id : 0,
        time : '09-04 21:43:56',
        sell : 210,
        buy  : 900,
        explain : '已通过',
        userId : "183642859474391040",
        state : '待审核'
      },
      {
        id : 1,
        time : '09-04 21:43:58',
        sell : 290,
        buy  : 300,
        explain : '结算佣金',
        userId : "183642859474391040",
        state : '待审核'
      },
      {
        id : 2,
        time : '09-04 21:43:58',
        sell : -260,
        buy  : 300,
        explain : '结算佣金',
        userId : "183642859474391040",
        state : '已通过'
      },
      {
        id : 3,
        time : '09-04 21:43:58',
        sell : -280,
        buy  : 300,
        explain : '待审核',
        userId : "183642859474391040",
        state : '审核拒绝'
      }
    ]
  }
  componentDidMount() {
    let arr = [];
    this.props.data.map((item,index)=>{
      arr.push(
        item.field
      )
    })
    this.setState({
      arr
    });
    this.getData();
  }
  getData() {
    const {data,url} = this.props;
    const {params} = this.state;
    API.CustomApi(url,params,(res)=>{
        this.setState({
          res
        })
    })
  }
  rescind(item) {
    alert(item.id)
  }
  render() {
    const {res , arr ,income,noData} = this.state;
    return (
      <tbody>
      {

        noData
        ?
        <tr>
          <td>wushuju</td>
        </tr>
        :
        res.map((row,index)=>{
          return (
                <tr key={index}>
                  {
                    arr.map((item,indexing)=>{
                       return (
                         <td key={indexing}>
                               {
                                  item === 'state' && row.state==='待审核'
                                   ?
                                   <div>
                                     <span className="rescind" onClick={()=>this.rescind(row)}>撤销</span>
                                     <span>{row[item]}</span>
                                   </div>
                                   :
                                   item === 'sell' && row[item]<0
                                   ?
                                   <span className="pay-out">{row[item]}</span>
                                   :
                                   item === 'sell' && row[item]>0
                                   ?
                                   <span className="income">{"+"+row[item]}</span>
                                   :
                                   <span>{row[item]}</span>
                              }
                          </td>
                       )
                    })
                  }
                </tr>
          )
        })
      }

      </tbody>
    )
  }
}
