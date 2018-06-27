import React from 'react';
import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import i18nJson from './i18nJson';
import {lStore,customEvent} from 'js/yydjs';
import './style.scss';

@autobind
class I18n extends React.Component{
    static propTypes={
        name:PropTypes.string.isRequired,
    }

    static defaultProps={
        name:'',//文字命名（必填）
    }

    /*
        <I18n name="LANGUAGE"/>
    */

    constructor(props){
        super(props);
        this.state={
            lang:lStore.get('i18nLanguage')||'zh',
        };

        customEvent.on('i18nChangeLanguage',(lang='zh')=>{
            lStore.set('i18nLanguage',lang);
            this.setState({
                lang,
            });
        });
    }

    render(){
        const {name}=this.props;
        const {lang}=this.state;

        return(
            <div className="I18n">
                {i18nJson[name][lang]}
            </div>
        )
    }
}

const changeI18n=(lang)=>{
    customEvent.emit('i18nChangeLanguage',lang);
};

export{
    I18n,
    changeI18n,
};