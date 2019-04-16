import axios from 'axios';

const initialState = {
    discussion: []
};

export const GET_DISCUSSION = 'GET_DISCUSSION';
export const NEW_MESSAGE = 'NEW_MESSAGE';

export function getDiscussion() {
    let data = axios.get('/discussion').then(res => res.data);
    return {
        type: GET_DISCUSSION,
        payload: data
    };
};

export function newMessage(message) {
    let data = axios.post('/discussion', message).then(res => res.data);
    return {
        type: NEW_MESSAGE,
        payload: data
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_DISCUSSION + '_FULFILLED':
            return {...state, discussion: action.payload};
        case NEW_MESSAGE + '_FULFILLED':
            return {...state, discussion: [...state.discussion, action.payload]};
        default:
            return state;
    }
};