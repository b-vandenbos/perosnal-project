import axios from 'axios';

const initialState = {
    allCompany: [],
    activeCompany: {}
}

export const GET_COMPANY = 'GET_COMPANY';
export const GET_ALL_COMPANY = 'GET_ALL_COMPANY';
export const ADD_NEW_COMPANY = 'ADD_NEW_COMPANY';

export function getAllCompany() {
    let data = axios.get('/company').then(res => res.data);
    return {
        type: GET_ALL_COMPANY,
        payload: data
    };
};

export function addNewCompany(company) {
    let data = axios.post('/company', company).then(res => res.data);
    return {
        type: ADD_NEW_COMPANY,
        payload: data
    }
};

export function getCompany(id) {
    let data = axios.get(`/company/${id}`).then(res => res.data);
    return {
        type: GET_COMPANY,
        payload: data
    }
}


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_COMPANY + '_FULFILLED':
            return {...state, allCompany: action.payload};
        case GET_COMPANY + '_FULFILLED':
            return {...state, activeCompany: action.payload};
        case ADD_NEW_COMPANY + '_FULFILLED':
            return {...state, allCompany: action.payload};
        default:
            return state;
    }
}