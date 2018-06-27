import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import './style.scss';

@autobind
export default class Input extends Component {
  static props = {
      name:PropTypes.string.isRequired,
      changeVal : PropTypes.func.isRequired,
      value:PropTypes.string,
      placeholder:PropTypes.string,
      type: PropTypes.string,
      icon : PropTypes.string,
      eyeToggle : PropTypes.func,
      append : PropTypes.string,
      disabled : PropTypes.bool,
      icon : PropTypes.string,
      errorHint : PropTypes.bool,
      onFocus : PropTypes.func,
      maxlength : PropTypes.number,
      autofocus : PropTypes.string,
      id :  PropTypes.string,
      className : PropTypes.string,
  };
  static defaultProps = {
      placeholder:'',
      type:'text',
      append : '',
      value : '',
      icon : '',
      disabled : false,
      errorHint : false,
      autofocus : false
  };
  state = {
    hideClose : false,
  }
  getVal(e) {
    const { changeVal,name } = this.props;
    this.props.changeVal(name,e.target.value);
  }
  getPassVal(e){
      const { changeVal,name } = this.props;
      this.props.changeVal(name,e.target.value.replace(/[^0-9a-zA-Z]/g, ''));
  }
  render() {
    const { className, value ,id, placeholder , eyeToggle , append , type , icon , disabled ,clearVal,errorHint,onFocus,maxlength,autofocus} = this.props;
    return (
      <div className="form-input">
      {
        append === 'B-Copy'
        ?
        <input type="password" id={id} maxLength={maxlength} className={(errorHint?'error-hint ':'')+ (icon!=''?'left-icon' : ''+className)} autoFocus={autofocus} placeholder={placeholder} value={value || ""} disabled={disabled} onChange={this.getPassVal} onFocus={onFocus&&onFocus()} />
        :
        append === 'B-Copy1'
        ?
        <input type='text' id={id} maxLength={maxlength} className={(errorHint?'error-hint ':'') + (icon!=''?'left-icon' : ''+className)} autoFocus={autofocus} placeholder={placeholder} value={value || ""} disabled={disabled} onChange={this.getPassVal} onFocus={onFocus&&onFocus()} />
        :
        <input type={type} id={id} maxLength={maxlength} className={(errorHint?'error-hint ':'') + (icon!=''?'left-icon' : ''+className)} autoFocus={autofocus} placeholder={placeholder} value={value || ""} disabled={disabled} onChange={this.getVal} onFocus={onFocus&&onFocus()} />

      }
        {
            icon === '+86'
            ?
              <div className="icon-wrap">{icon}</div>
            :
            icon != '+86' && icon != ''
            ?
              <div className="icon-wrap"><div className={"icon iconfont icon-" + icon}></div></div>
            :
            ""
        }
        <div className="icon-right">
            {
                clearVal && value.length != 0
                    ?
                    <i onClick={_=>clearVal&&clearVal()} className="iconfont icon-B-Copy6"></i>
                    :
                    ""
            }
            {
                append
                    ?
                    <i onClick={_=>eyeToggle&&eyeToggle()} className={"iconfont icon-" + append}></i>
                    :

                    ''
            }
        </div>



      </div>
    )
  }
}
