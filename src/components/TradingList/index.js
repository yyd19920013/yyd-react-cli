import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import HTable from './HTable';
import API from 'services/index1';
import './style.scss';

@autobind
export default class TradingList extends Component {
  static props = {
    url : PropTypes.string.isRequired,
    data : PropTypes.array.isRequired,
    loadingMore : PropTypes.boolean,
  }
  static defaultProps = {
    loadingMore : true
  }
  state = {
    indexVal : 1
  }
  upload() {
    this.setState({
      indexVal : this.state.indexVal+1
    })
    const that = this;
    const {data,url} = this.props;
    const {indexVal} = this.state;
    let params = {
      pageSize : 10,
      page : indexVal
    }
    console.log(params)
    API.customApi(url,params,(res)=>{

    })
  }
  render() {
    const {loadingMore} = this.props;
    return (
      <div className="trading-list">
          <table>
                <thead>
                  <tr>
                  {
                    this.props.data.map((title,index)=>{
                      return <td key={index}><span>{title.label}</span></td>
                    })
                  }
                  </tr>
                </thead>
              <HTable {...this.props}></HTable>
          </table>
          {
            loadingMore
            ?
              <div className="more" onClick={this.upload}>点击加载更多</div>
            :
              ''
          }
      </div>
    )
  }
}
