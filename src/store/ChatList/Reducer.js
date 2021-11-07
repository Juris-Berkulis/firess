//! At the moment, nothing from this file is being used!
// import { MESSAGES_LIST } from './Action';

const initialState = [];

export const chatListReducer = (state = initialState, action) => {
    switch(action.type) {
        // case MESSAGES_LIST: {
        //     return [
        //         ...state, ...action.payload
        //     ]
        // }
        default: {
            return state
        }
    }
};
