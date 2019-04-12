import axios from 'axios';

const initialState = {
    headlines: {}
}

export const GET_HEADLINES = 'GET_HEADLINES';

export function getHeadlines() {
    let headlines = axios.get('https://rxapi.decwise.com/manager/engagement/all').then(res => res.data);
    return {
        type: GET_HEADLINES,
        payload: headlines
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_HEADLINES + '_FULFILLED':
            return {headlines: action.payload};
        default:
            return state;
    }
}