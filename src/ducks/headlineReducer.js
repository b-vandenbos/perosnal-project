import axios from 'axios';

const initialState = {
    headlines: {},
    headlineIndex: 0
}

export const UPDATE_HEADLINES = 'UPDATE_HEADLINES';
export const UPDATE_INDEX = 'UPDATE_INDEX';

export function getHeadlines() {
    let headlines = axios.get('https://rxapi.decwise.com/manager/engagement/all').then(res => res.data.data.recs);
    return {
        type: UPDATE_HEADLINES,
        payload: headlines
    };
};

export function headlineIndex(num) {
    let data = axios.put(`/headlines/nav/${num}`).then(res => res.data);
    return {
        type: UPDATE_INDEX,
        payload: data
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_HEADLINES + '_FULFILLED':
            return {...state, headlines: action.payload};
        case UPDATE_INDEX + '_FULFILLED':
            return {...state, headlineIndex: action.payload};
        default:
            return state;
    };
}