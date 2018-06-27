import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import './style.scss';

@autobind
export default class HButton extends Component {
  static props = {
      text:PropTypes.string.isRequired,
      size : PropTypes.string.isRequired,
      type : PropTypes.string.isRequired,
      onClick : PropTypes.func.isRequired,
      light : PropTypes.boolean,
      radius : PropTypes.boolean,
      dim : PropTypes.boolean,
  };
  static defaultProps = {
    text : '按钮',
    size : 'small',
    type : 'default',
    radius : true,
    dim : false,
  };
  render() {
    const { text , size , type ,radius,onClick,dim } = this.props;
    return (
      <div className={"btn"}>
          <button className={"btn-"+size+" btn-"+type+(radius?' radius' : '')+(dim?' dim':'')} onClick={()=>(!dim && type!='disabled') && onClick && onClick()}><span>{text}</span></button>
      </div>
    )
  }

}
