import axios from 'axios';

const initialState = {
    discussion: []
};

export const UPDATE_DISCUSSION = 'UPDATE_DISCUSSION';
export const NEW_MESSAGE = 'NEW_MESSAGE';

export function getDiscussion() {
    let data = axios.get('/discussion').then(res => res.data);
    return {
        type: UPDATE_DISCUSSION,
        payload: data
    };
};

export function newMessage(message) {
    let data = axios.post('/discussion', message).then(res => res.data);
    return {
        type: UPDATE_DISCUSSION,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_DISCUSSION + '_FULFILLED':
            return {...state, discussion: action.payload};
        default:
            return state;
    }
};