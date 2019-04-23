import axios from 'axios';

const initialState = {
    allCompany: [],
    activeCompany: {}
}

export const UPDATE_ACTIVE_COMPANY = 'UPDATE_ACTIVE_COMPANY';
export const UPDATE_ALL_COMPANY = 'UPDATE_ALL_COMPANY';

export function setActiveCompany(company) {
    let data = axios.post(`/company/${company.id}`, company).then(res => res.data);
    return {
        type: UPDATE_ACTIVE_COMPANY,
        payload: data
    };
};

export function getAllCompany() {
    let data = axios.get('/company').then(res => res.data);
    return {
        type: UPDATE_ALL_COMPANY,
        payload: data
    };
};

export function addNewCompany(company) {
    let data = axios.post('/company', company).then(res => res.data);
    return {
        type: UPDATE_ALL_COMPANY,
        payload: data
    }
};

export function updateCompany(updatedComp) {
    let data = axios.put(`/company/${updatedComp.id}`, updatedComp).then(res => res.data);
    return {
        type: UPDATE_ALL_COMPANY,
        payload: data
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_ACTIVE_COMPANY + '_FULFILLED':
            return {...state, activeCompany: action.payload};
        case UPDATE_ALL_COMPANY + '_FULFILLED':
            return {...state, allCompany: action.payload};
        default:
            return state;
    };
}