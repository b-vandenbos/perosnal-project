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

export function getSurvey() {
    let data = axios.get('/survey').then(res => res.data);
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
    let data = axios.get('/dimensions').then(res => res.data);
    return {
        type: GET_DIMENSIONS,
        payload: data
    };
};

export function updateSurveyItem(item) {
    axios.put(`/survey/${item.id}`, item).then(res => res.data);
    return {
        type: UPDATE_SURVEY_ITEM
    };
};

export function addSurveyItem(item) {
    let data = axios.post('/survey', item).then(res => res.data);
    return {
        type: ADD_SURVEY_ITEM,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_SURVEY + '_FULFILLED':
            return {...state, survey: action.payload};
        case GET_DIMENSIONS + '_FULFILLED':
            return {...state, dimensions: action.payload};
        case UPDATE_SURVEY_ITEM + '_FULFILLED':
            return {...state, survey: action.payload};
        case ADD_SURVEY_ITEM + '_FULFILLED':
            return {...state, suggested: [...state.suggested, action.payload]};
        default:
            return state;
    }
}