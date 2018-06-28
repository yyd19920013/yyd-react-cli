import React from 'react';
import {autobind} from 'core-decorators';
import PropsTypes from 'prop-types';
import './style.scss';

@autobind
export default class Container extends React.Component{
    render(){
        return(
            <div className="Container clear">
                {React.Children.map(this.props.children,(item,index)=>item)}
            </div>
        )
    }
}