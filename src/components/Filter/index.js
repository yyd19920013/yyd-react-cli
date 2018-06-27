import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import './style.scss';

@autobind
export default class Filter extends React.Component{
    static props = {
        filterData : PropTypes.object.isRequired,
        changeCheck : PropTypes.func,
        revert : PropTypes.boolean,
    };
    static defaultProps = {
        filterData : {}

    };
    state = {
        checkedItem : ''
    };
    componentWillReceiveProps(nextProps) {
        if(this.props.revert != nextProps.revert) {
            this.setState({
                checkedItem : ''
            });
        }
    }
    checkItem(e,index){
        this.setState({
            checkedItem : index
        });
    }
    render(){
        const {filterData,changeCheck} = this.props;
        const {checkedItem} = this.state;
        return(
            <div className="filter-content">
                {
                    <div className="filter-item">
                        <h2>{filterData.title}</h2>
                        <ul>
                            {
                                filterData.label.map((item,inx)=>{
                                    return (
                                        <li key={inx} className={checkedItem!=undefined && inx === checkedItem?'active':''} onClick={(e)=>{this.checkItem(e,inx);changeCheck && changeCheck(item)}}>
                                            <button>
                                                <span>{item.name}</span>
                                                <i className={checkedItem!=undefined && inx === checkedItem?'hook':''}></i>
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
        )
    }
}