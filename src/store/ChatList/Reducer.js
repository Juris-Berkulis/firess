import { CHANGE_MESSAGES_LIST, DROP_MESSAGES_IN_STATE } from './Action';

const initialState = {
    messages: {},
};

export const chatListReducer = (state = initialState, action) => {
    switch(action.type) {
        // case ADD_MESSAGE_IN_CHAT_LIST: {
        //     const {message, chatId} = action.payload;
        //     const newMessages = {...state.messages};
        //     newMessages[chatId] = {
        //         ...(newMessages[chatId] || {}),
        //         [message.messageKey]: message,
        //     };
        //     return {
        //         messages: newMessages
        //     }
        // }
        // case REMOVE_MESSAGE_IN_CHAT_LIST: {
        //     const newMessages = {...state.messages};
        //     delete newMessages[action.payload];
        //     return {
        //         messages: newMessages
        //     }
        // }
        case CHANGE_MESSAGES_LIST: {
            // console.log(state)
            // console.log(action.payload.snapshotVal)
            return {
                messages: {
                    [action.payload.openChatKey]: action.payload.snapshotVal
                }
            }
        }
        case DROP_MESSAGES_IN_STATE: {
            // console.log(state)
            return {
                messages: {}
            }
        }
        default: {
            return state
        }
    }
};
