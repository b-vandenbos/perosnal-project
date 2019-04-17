import axios from 'axios';

const initialState = {
    user: {},
    allUsers: []
}

export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const LOGOUT = 'LOGOUT';

export function addUser(user) {
    let data = axios.post('/auth/register', user).then(res => res.data);
    return {
        type: ADD_USER,
        payload: data
    }
}

export function getUser() {
    let data = axios.get('/auth/user').then(res => res.data);
    return {
        type: GET_USER,
        payload: data
    };
};

export function getAllUsers() {
    let data = axios.get(`/users`).then(res => res.data);
    return {
        type: GET_ALL_USERS,
        payload: data
    };
};

export function logout() {
    axios.get('/auth/logout').then(res => res.data);
    return {
        type: LOGOUT
    };
};


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_USER + '_FULFILLED':
            return {...state, allUsers: action.payload};
        case GET_USER + '_FULFILLED':
            return {...state, user: action.payload};
        case GET_ALL_USERS + '_FULFILLED':
            return {...state, allUsers: action.payload};
        case LOGOUT + '_FULFILLED':
            return {...state, user: {}};
        default:
            return state;
    }
}