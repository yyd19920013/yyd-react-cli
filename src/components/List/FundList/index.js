import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import './style.scss';

@autobind
export default class FundList extends React.Component{
    static props = {
      url : PropTypes.string.isRequired,
      data : PropTypes.array.isRequired
    }
    static defaultProps = {
      data : [
        {
          label : '指数交易',
          time : '08-06 06:06:06',
          money : 892
        },
        {
          label : '指数交易',
          time : '08-06 06:06:06',
          money : 892
        },
        {
          label : '指数交易',
          time : '08-06 06:06:06',
          money : 892
        },
        {
          label : '指数交易',
          time : '08-06 06:06:06',
          money : -986
        },
        {
          label : '指数交易',
          time : '08-06 06:06:06',
          money : -862
        },
      ]
    }
    state = {
      indexVal : 1,
    }
    loadingMore() {
      this.setState({
        indexVal : this.state.indexVal+1
      })
      const that = this;
      const {data,url} = this.props;
      const {indexVal} = this.state;
      let params = {
        pageIndex : indexVal,
        pageSize : 10
      }
      console.log(params)
      // API.customApi(url,param,(res)=>{
      //     that.setState({
      //       res
      //     })
      // })
    }
    render(){
      const {data} = this.props;
        return(
            <div className="fund-list">
                <ul>
                {
                  data.map((item,index)=>{
                    return (
                      <li key={index}>
                          <div className="fund">
                              <h3>{item.label}</h3>
                              <h4>{item.time}</h4>
                          </div>
                          {
                            item.money <0
                            ?
                              <span className="pay-out">{item.money}</span>
                            :
                            <span className="income">{'+' + item.money}</span>
                          }

                      </li>
                    )
                  })
                }
                </ul>
                <div className="loading-more" onClick={this.loadingMore}>点击加载更多</div>
            </div>
        )
    }
}
