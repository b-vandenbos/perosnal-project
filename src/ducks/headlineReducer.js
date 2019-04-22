import axios from 'axios';

const initialState = {
    headlines: {},
    headlineIndex: 0
}

export const GET_HEADLINES = 'GET_HEADLINES';
export const HEADLINE_INDEX = 'HEADLINE_INDEX';

export function getHeadlines() {
    let headlines = axios.get('https://rxapi.decwise.com/manager/engagement/all').then(res => res.data.data.recs);
    return {
        type: GET_HEADLINES,
        payload: headlines
    };
};

export function headlineIndex(num) {
    let data = axios.put(`/headlines/nav/${num}`).then(res => res.data);
    return {
        type: HEADLINE_INDEX,
        payload: data
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_HEADLINES + '_FULFILLED':
            return {...state, headlines: action.payload};
        case HEADLINE_INDEX + '_FULFILLED':
            return {...state, headlineIndex: action.payload};
        default:
            return state;
    };
}