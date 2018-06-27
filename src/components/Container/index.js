import React from 'react';
import {autobind} from 'core-decorators';
import Download from 'components/Download';
import PropsTypes from 'prop-types';
import './style.scss';

@autobind
export default class Container extends React.Component{
    static PropsTypes={
        hideDownload:PropsTypes.bool,
    }

    static defaultProps={
        hideDownload:false,
    }

    /*
        <Container hideDownload={true}>
            默认是有下载链接
        </Container>
    */

    render(){
        const {hideDownload}=this.props;

        return(
            <div className="ContainerWrap">
                {
                    !hideDownload&&
                    <Download />
                }

                <div className="Container clear">
                    {React.Children.map(this.props.children,(item,index)=>item)}
                </div>
            </div>
        )
    }
}