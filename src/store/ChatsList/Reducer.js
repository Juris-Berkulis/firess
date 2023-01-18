import { CHANGE_CHATS_LIST, DROP_CHATS_LIST_IN_STATE } from './Action';
import { CHAT_LIST  } from '../../data/chat list';

export const initialState = CHAT_LIST;

export const chatsListReducer = (state = initialState, action) => {
    switch(action?.type) {
        case CHANGE_CHATS_LIST: {
            return {
                ...state,
                chats: action.payload,
            }
        }
        case DROP_CHATS_LIST_IN_STATE: {
            return {
                chats: {}
            }
        }
        default: {
            return state
        }
    }
};
