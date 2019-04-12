import axios from 'axios';

const initialState = {
    allCompany: []
}

export const GET_ALL_COMPANY = 'GET_ALL_COMPANY';

export function getAllCompany() {
    let data = axios.get('/company').then(res => res.data);
    return {
        type: GET_ALL_COMPANY,
        payload: data
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_COMPANY + '_FULFILLED':
            return {allCompany: action.payload};
        default:
            return state;
    }
}