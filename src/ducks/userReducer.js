import axios from 'axios';

const initialState = {
    user: {},
    allUsers: [],
    allAdmins: []
}

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_ALLUSERS = 'UPDATE_ALLUSERS';
export const UPDATE_ALLADMINS = 'UPDATE_ALLADMINS';
export const UPDATE_ALLUSERS_ALLADMINS = 'UPDATE_ALLUSERS_ALLADMINS';
export const UPDATE_USER_ALLADMINS = 'UPDATE_USER_ALLADMINS';
export const LOGOUT = 'LOGOUT';

export function addUser(user) {
    let data = axios.post('/auth/register', user).then(res => res.data);
    return {
        type: UPDATE_ALLUSERS_ALLADMINS,
        payload: data
    };
};

export function addUserImage(user) {
    let data = axios.post('/add-image', user).then(res => res.data);
    console.log(data);
    return {
        type: UPDATE_USER,
        payload: data
    };
};

export function getUser() {
    let data = axios.get('/auth/user').then(res => res.data);
    return {
        type: UPDATE_USER,
        payload: data
    };
};

export function getAllUsers() {
    let data = axios.get(`/users`).then(res => res.data);
    return {
        type: UPDATE_ALLUSERS,
        payload: data
    };
};

export function getAllAdmins() {
    let data = axios.get('/admins').then(res => res.data);
    return {
        type: UPDATE_ALLADMINS,
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
        type: UPDATE_USER_ALLADMINS,
        payload: data
    };
};

export function updateUser(user) {
    let data = axios.put('/update-user', user).then(res => res.data);
    return {
        type: UPDATE_ALLUSERS_ALLADMINS,
        payload: data
    };
};

export function deleteUser(id) {
    let data = axios.delete(`/delete-user/${id}`).then(res => res.data);
    return {
        type: UPDATE_ALLUSERS_ALLADMINS,
        payload: data
    };
};

export function forgotPassword(user_email) {
    let data = axios.put(`/auth/user/forgot-password/${user_email}`).then(res => res.data);
    return {
        type: UPDATE_ALLUSERS_ALLADMINS,
        payload: data
    };

};

export default function reducer(state = initialState, action) {
    switch(action.type) {
            case UPDATE_USER + '_FULFILLED':
                return {...state, user: action.payload};
            case UPDATE_ALLUSERS + '_FULFILLED':
                return {...state, allUsers: action.payload};
            case UPDATE_ALLADMINS + '_FULFILLED':
                return {...state, allAdmins: action.payload};
            case UPDATE_USER_ALLADMINS + '_FULFILLED':
                return {...state, user: action.payload.user, allAdmins: action.payload.allAdmins};
            case UPDATE_ALLUSERS_ALLADMINS + '_FULFILLED':
                return {...state, allUsers: action.payload.allUsers, allAdmins: action.payload.allAdmins};
            case LOGOUT + '_FULFILLED':
                return {...state, user: {}};
            default:
                return state;
    };
};