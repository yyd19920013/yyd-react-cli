import React from 'react';
import {autobind} from 'core-decorators';
import {Switch,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from 'store/actions';
import Home from 'pages/Home';
import Page404 from 'pages/Page404';
import Loading from 'components/Loading';
import './style.scss';

@autobind
class App extends React.Component{
    render(){
        const {loading}=this.props;

        return (
            <div className="App">
                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="*" component={Page404} />
                </Switch>
                <Loading show={loading} />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    let {loading}=state;

    loading=loading.toJS().show;
    return {
        loading,
    };
};

export default connect(mapStateToProps)(App);
