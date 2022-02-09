import { CHANGE_CHATS_LIST, DROP_CHATS_LIST_IN_STATE } from './Action';
import { CHAT_LIST  } from '../../data/chat list';

export const initialState = CHAT_LIST;

export const chatsListReducer = (state = initialState, action) => {
    switch(action?.type) {
        // case ADD_IN_CHATS_LIST: {
        //     return {
        //         ...state,
        //         chats: {
        //             ...state.chats,
        //             [action.payload.name]: action.payload,
        //         }
        //     }
        // }
        // case REMOVE_FROM_CHATS_LIST: {
        //     if (!action.payload) {
        //         return state
        //     };
        //     const chats = {...state.chats};
        //     delete chats[action.payload];
        //     return {
        //         ...state,
        //         chats,
        //         deletedChatName: action.payload,
        //     }
        // }
        case CHANGE_CHATS_LIST: {
            return {
                ...state,
                chats: action.payload,
            }
        }
        case DROP_CHATS_LIST_IN_STATE: {
            return {
                chats: []
            }
        }
        default: {
            return state
        }
    }
};
