import axios from 'axios';

const initialState = {
    user: {},
    allUsers: []
}

export const GET_USER = 'GET_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export function getUser() {
    let data = axios.get('/auth/user').then(res => res.data);
    return {
        type: GET_USER,
        payload: data
    };
};

export function getAllUsers() {
    let data = axios.get('/users').then(res => res.data);
    return {
        type: GET_ALL_USERS,
        payload: data
    };
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER + '_FULFILLED':
            return {user: action.payload};
        case GET_ALL_USERS + '_FULFILLED':
            return {allUsers: action.payload};
        default:
            return state;
    }
}