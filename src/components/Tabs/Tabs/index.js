import React from 'react';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import './style.scss';

@autobind
export default class Tabs extends React.Component {
    static props = {
        labels: PropTypes.array.isRequired,
        tabClick: PropTypes.func,
        tabIndex : PropTypes.number,
    };
    static defaultProps = {
        tabIndex: 0,
    };

    state = {
        index : 0,
    }
    componentDidMount(){
        this.setState({
            index : this.props.tabIndex
        });
    }
    setIndex(index) {
        this.setState({index})
    }
    render() {
        const {labels,tabClick} = this.props;
        const {index} = this.state;
        return (
            <div className='tabs'>
                <ul className="tabs-nav">
                    {
                        labels.map((item, idx) => <li
                            onClick={_ => {
                                this.setIndex(idx);
                                tabClick && tabClick(idx);
                            }}
                            className={"tab-nav-item " + (idx === index ? "active" : "")}
                            key={idx}>{item.icon?<span className={"icon iconfont icon-"+item.icon}></span> : ''}{item.label}</li>)
                    }
                </ul>
                <div className="tab-content">
                    {
                        this.props.children[index]
                    }
                </div>
            </div>
        )
    }
}
