import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/userReducer';
import headlineReducer from './ducks/headlineReducer';
import companyReducer from './ducks/companyReducer';

const rootReducer = combineReducers({
    user: userReducer,
    headlines: headlineReducer,
    company: companyReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));