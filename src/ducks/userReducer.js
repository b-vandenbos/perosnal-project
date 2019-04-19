import axios from 'axios';

const initialState = {
    user: {},
    allUsers: [],
    allAdmins: []
}

export const ADD_USER = 'ADD_USER';
export const ADD_USER_IMAGE = 'ADD_USER_IMAGE';
export const GET_USER = 'GET_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_ADMINS = 'GET_ALL_ADMINS';
export const LOGOUT = 'LOGOUT';
export const UPDATE_ADMIN_USER = 'UPDATE_ADMIN_USER';

export function addUser(user) {
    let data = axios.post('/auth/register', user).then(res => res.data);
    return {
        type: ADD_USER,
        payload: data
    };
};

export function addUserImage(user) {
    let data = axios.post('/add-image', user).then(res => res.data);
    return {
        type: ADD_USER_IMAGE,
        payload: data
    };
};

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

export function getAllAdmins() {
    let data = axios.get('/admins').then(res => res.data);
    return {
        type: GET_ALL_ADMINS,
        payload: data
    };
};

export function logout() {
    let data = axios.get('/auth/logout').then(res => res.data);
    return {
        type: LOGOUT,
        payload: data
    };
};

export function updateAdminUser(userInfo) {
    let data = axios.put(`/update-admin`, userInfo).then(res => res.data);
    return {
        type: UPDATE_ADMIN_USER,
        payload: data
    };
};


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_USER + '_FULFILLED':
            return {...state, allUsers: action.payload.users, allAdmins: action.payload.admins};
        case GET_USER + '_FULFILLED':
            return {...state, user: action.payload};
        case ADD_USER_IMAGE + '_FULFILLED':
            return {...state, user: action.payload};
        case GET_ALL_USERS + '_FULFILLED':
            return {...state, allUsers: action.payload};
        case GET_ALL_ADMINS + '_FULFILLED':
            return {...state, allAdmins: action.payload};
        case LOGOUT + '_FULFILLED':
            return {...state, user: {}};
        case UPDATE_ADMIN_USER + '_FULFILLED':
            return {...state, user: action.payload.user, allAdmins: action.payload.allAdmins};
        default:
            return state;
    };
};