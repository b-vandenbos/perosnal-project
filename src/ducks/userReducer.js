import axios from 'axios';

const initialState = {
    loading: false,
    user: {},
    allUsers: []
}

export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';

export function addUser(user) {
    let data = axios.post('/auth/register', user);
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
        case GET_ALL_USERS + '_PENDING':
            return {...state, loading: true};
        case GET_ALL_USERS + '_FULFILLED':
            return {allUsers: action.payload, loading: false};
       
        default:
            return state;
    }
}