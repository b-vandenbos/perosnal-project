import axios from 'axios';

const initialState = {
    survey: [],
    dimensions: [],
    suggested: []
};

export const UPDATE_DIMENSIONS = 'UPDATE_DIMENSIONS';
export const UPDATE_SURVEY = 'UPDATE_SURVEY';
export const UPDATE_SUGGESTED = 'UPDATE_SUGGESTED';
export const UPDATE_SURVEY_AND_SUGGESTED = 'UPDATE_SURVEY_AND_SUGGESTED';
export const UPDATE_DIMENSIONS_AND_SUGGESTED = 'UPDATE_DIMENSIONS_AND_SUGGESTED';
export const UPDATE_DIMENSIONS_AND_SURVEY_AND_SUGGESTED = 'UPDATE_DIMENSIONS_AND_SURVEY_AND_SUGGESTED';


export function getSurvey() {
    let data = axios.get(`/survey`).then(res => res.data);
    return {
        type: UPDATE_SURVEY,
        payload: data
    };
};

export function getSuggested() {
    let data = axios.get('/suggested').then(res => res.data);
    return {
        type: UPDATE_SUGGESTED,
        payload: data
    };
};

export function getDimensions() {
    let data = axios.get(`/dimensions`).then(res => res.data);
    return {
        type: UPDATE_DIMENSIONS,
        payload: data
    };
};

export function updateSurveyItem(item) {
    let data = axios.put(`/survey/${item.id}`, item).then(res => res.data);
    return {
        type: UPDATE_SURVEY,
        payload: data
    };
};

export function addSurveyItem(item) {
    let data = axios.post('/survey', item).then(res => res.data);
    return {
        type: UPDATE_SUGGESTED,
        payload: data
    };
};

export function deleteSurveyItem(item) {
    let data = axios.post(`/delete/${item.id}`, item).then(res => res.data);
    return {
        type: UPDATE_SURVEY,
        payload: data
    };
};

export function deleteSuggestedItem(item) {
    let data = axios.post(`/delete-suggested/${item.id}`, item).then(res => res.data);
    return {
        type: UPDATE_SUGGESTED,
        payload: data
    };
};

export function transferSurveyItem(item) {
    let data = axios.post('/transfer-item', item).then(res => res.data);
    return {
        type: UPDATE_SURVEY_AND_SUGGESTED,
        payload: data
    };
};

export function addDimension(newDim) {
    let data = axios.post('/add-dimension', newDim).then(res => res.data);
    return {
        type: UPDATE_DIMENSIONS,
        payload: data
    };
};

export function updateDimension(updateInfo) {
    let data = axios.put(`/dimensions/${updateInfo.id}`, updateInfo).then(res => res.data);
    return {
        type: UPDATE_DIMENSIONS_AND_SUGGESTED,
        payload: data
    };
};

export function reorderItems(surveyItem) {
    let data = axios.put(`/reorder`, surveyItem).then(res => res.data);
    return {
        type: UPDATE_SURVEY,
        payload: data
    };
};

export function deleteDimension(dimension) {
    let data = axios.put(`/delete-dimension`, dimension).then(res => res.data);
    return {
        type: UPDATE_DIMENSIONS_AND_SURVEY_AND_SUGGESTED,
        payload: data
    };
};

export function reorderDimensions(dimension) {
    let data = axios.put('/reorder-dimension', dimension).then(res => res.data);
    return {
        type: UPDATE_DIMENSIONS_AND_SURVEY_AND_SUGGESTED,
        payload: data
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_DIMENSIONS + '_FULFILLED':
            return {...state, dimensions: action.payload};
        case UPDATE_SURVEY + '_FULFILLED':
            return {...state, survey: action.payload};
        case UPDATE_SUGGESTED + '_FULFILLED':
            return {...state, suggested: action.payload};
        case UPDATE_SURVEY_AND_SUGGESTED + '_FULFILLED':
            return {...state, survey: action.payload.survey, suggested: action.payload.suggested};
        case UPDATE_DIMENSIONS_AND_SUGGESTED + '_FULFILLED':
            return {...state, suggested: action.payload.suggested, dimensions: action.payload.dimensions};
        case UPDATE_DIMENSIONS_AND_SURVEY_AND_SUGGESTED + '_FULFILLED':
            return {survey: action.payload.survey, suggested: action.payload.suggested, dimensions: action.payload.dimensions};
        default:
            return state;
    }
}