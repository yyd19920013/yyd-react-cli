import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {middleware} from 'src';
import * as reducers from 'store/reducers';

const reducesJson=combineReducers(reducers);

export default createStore(
    reducesJson,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware),
    applyMiddleware(middleware)
);
