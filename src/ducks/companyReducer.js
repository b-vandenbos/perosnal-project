import axios from 'axios';

const initialState = {
    allCompany: [],
    activeCompany: {}
}

export const GET_ALL_COMPANY = 'GET_ALL_COMPANY';
export const ADD_NEW_COMPANY = 'ADD_NEW_COMPANY';
export const SET_ACTIVE_COMPANY = 'SET_ACTIVE_COMPANY';
export const UPDATE_COMPANY = 'UPDATE_COMPANY';
// export const DELETE_COMPANY = 'DELETE_COMPANY';

export function setActiveCompany(company) {
    let data = axios.post(`/company/${company.id}`, company).then(res => res.data);
    return {
        type: SET_ACTIVE_COMPANY,
        payload: data
    };
};

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

export function updateCompany(updatedComp) {
    let data = axios.put(`/company/${updatedComp.id}`, updatedComp).then(res => res.data);
    return {
        type: UPDATE_COMPANY,
        payload: data
    };
};

// export function deleteCompany(id) {
//     let data = axios.delete(`/company/${id}`).then(res => res.data);
//     return {
//         type: DELETE_COMPANY,
//         payload: data
//     };
// };

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_ACTIVE_COMPANY + '_FULFILLED':
            return {...state, activeCompany: action.payload};
        case GET_ALL_COMPANY + '_FULFILLED':
            return {...state, allCompany: action.payload};
        case ADD_NEW_COMPANY + '_FULFILLED':
            return {...state, allCompany: action.payload};
        case UPDATE_COMPANY + '_FULFILLED':
            return {...state, allCompany: action.payload};
        // case DELETE_COMPANY + '_FULFILLED':
        //     return {...state, allCompany: action.payload};
        default:
            return state;
    };
}