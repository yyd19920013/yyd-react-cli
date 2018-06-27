import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import './style.scss';

@autobind
export default class UserImg extends Component {
  static props = {
      src:PropTypes.string,
  };
  static defaultProps = {
    src : require('images/user_img.svg')
  }
  render() {
    const { src } = this.props;
    return(
      <div className="user-img">
          <img src={src?src+'?x-oss-process=image/auto-orient,1':require('images/user_img.svg')} />
      </div>
    )
  }

}
