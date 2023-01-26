import { bigChatClose, bigChatOpen } from './Action';

const initialState = {
    isBigChatOpen: false,
};

export const bigChatReducer = (state = initialState, action) => {
    switch(action.type) {
        case bigChatOpen.type: {
            return {
                ...state,
                isBigChatOpen: action.payload,
            }
        }
        case bigChatClose.type: {
            return {
                ...state,
                isBigChatOpen: false,
            }
        }
        default: {
            return state
        }
    }
};
