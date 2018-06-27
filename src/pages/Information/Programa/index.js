import React from 'react';
import {autobind} from 'core-decorators';
import {Link} from 'react-router-dom';
import Container from 'components/Container';
import Autoplay from 'components/Autoplay';
import PullLoadList from 'components/PullLoadList';
import {qryArticle} from 'services';
import {strToJson} from 'js/yydjs';
import {browser} from 'src';
import './style.scss';

@autobind
export default class Programa extends React.Component{
    constructor(props){
        super(props);
        this.state={
            update:true,
        };

        this.search=strToJson();
    }

    componentDidMount(){

    }

    componentDidUpdate(){
        if(this.search.section!=strToJson().section){
            this.search=strToJson();
            this.setState({
                update:false,
            });
            setTimeout(()=>{
                this.setState({
                    update:true,
                });
            });
        }
    }

    render(){
        const {update}=this.state;

        return(
            <div className="Programa">
                <Container>
                    {
                        update&&
                        <PullLoadList
                            api={qryArticle}
                            json={{
                                page:0,
                                section:strToJson().section,
                            }}
                        />
                    }
                </Container>
            </div>
        )
    }
}