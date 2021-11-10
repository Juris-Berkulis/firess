import { ADD_MESSAGE_IN_CHAT_LIST, REMOVE_MESSAGE_IN_CHAT_LIST } from './Action';

const initialState = {
    messages: {},
};

export const chatListReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE_IN_CHAT_LIST: {
            const {message, chatId} = action.payload;
            const newMessages = {...state.messages};
            newMessages[chatId] = [...(newMessages[chatId] || []), message,];
            console.log(newMessages)
            return {
                messages: newMessages
            }
        }
        case REMOVE_MESSAGE_IN_CHAT_LIST: {
            const newMessages = {...state.messages};
            console.log(newMessages[action.payload])
            delete newMessages[action.payload];
            return {
                messages: newMessages
            }
        }
        default: {
            return state
        }
    }
};
