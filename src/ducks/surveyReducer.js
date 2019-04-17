import axios from 'axios';

const initialState = {
    survey: [],
    dimensions: [],
    suggested: []
};

export const GET_SURVEY = 'GET_SURVEY';
export const GET_SUGGESTED = 'GET_SUGGESTED';
export const GET_DIMENSIONS = 'GET_DIMENSIONS';
export const UPDATE_SURVEY_ITEM = 'UPDATE_SURVEY_ITEM';
export const ADD_SURVEY_ITEM = 'ADD_SURVEY_ITEM';
export const DELETE_SURVEY_ITEM = 'DELETE_SURVEY_ITEM';
export const DELETE_SUGGESTED_ITEM = 'DELETE_SUGGESTED_ITEM';
export const TRANSFER_SURVEY_ITEM = 'TRANSFER_SURVEY_ITEM';

export function getSurvey() {
    let data = axios.get(`/survey`).then(res => res.data);
    return {
        type: GET_SURVEY,
        payload: data
    };
};

export function getSuggested() {
    let data = axios.get('/suggested').then(res => res.data);
    return {
        type: GET_SUGGESTED,
        payload: data
    };
};

export function getDimensions() {
    let data = axios.get(`/dimensions`).then(res => res.data);
    return {
        type: GET_DIMENSIONS,
        payload: data
    };
};

export function updateSurveyItem(item) {
    let data = axios.put(`/survey/${item.id}`, item).then(res => res.data);
    return {
        type: UPDATE_SURVEY_ITEM,
        payload: data
    };
};

export function addSurveyItem(item) {
    let data = axios.post('/survey', item).then(res => res.data);
    return {
        type: ADD_SURVEY_ITEM,
        payload: data
    };
};

export function deleteSurveyItem(item) {
    let data = axios.post(`/delete/${item.id}`, item).then(res => res.data);
    return {
        type: DELETE_SURVEY_ITEM,
        payload: data
    };
};

export function deleteSuggestedItem(item) {
    let data = axios.post(`/delete-suggested/${item.id}`, item).then(res => res.data);
    return {
        type: DELETE_SUGGESTED_ITEM,
        payload: data
    };
};

export function transferSurveyItem(item) {
    let data = axios.post('/transfer-item', item).then(res => res.data);
    return {
        type: TRANSFER_SURVEY_ITEM,
        payload: data
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_SURVEY + '_FULFILLED':
            return {...state, survey: action.payload};
        case GET_SUGGESTED + '_FULFILLED':
            return {...state, suggested: action.payload};
        case GET_DIMENSIONS + '_FULFILLED':
            return {...state, dimensions: action.payload};
        case UPDATE_SURVEY_ITEM + '_FULFILLED':
            return {...state, survey: action.payload};
        case ADD_SURVEY_ITEM + '_FULFILLED':
            return {...state, suggested: action.payload};
        case DELETE_SURVEY_ITEM + '_FULFILLED':
            return {...state, survey: action.payload};
        case DELETE_SUGGESTED_ITEM + '_FULFILLED':
            return {...state, suggested: action.payload};
        case TRANSFER_SURVEY_ITEM + '_FULFILLED':
            return {...state, survey: action.payload.survey, suggested: action.payload.suggested};
        default:
            return state;
    }
}