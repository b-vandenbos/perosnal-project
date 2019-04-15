import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/userReducer';
import headlineReducer from './ducks/headlineReducer';
import companyReducer from './ducks/companyReducer';
import surveyReducer from './ducks/surveyReducer';

const rootReducer = combineReducers({
    user: userReducer,
    headlines: headlineReducer,
    company: companyReducer,
    survey: surveyReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));