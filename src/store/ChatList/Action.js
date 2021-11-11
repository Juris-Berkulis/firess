export const ADD_MESSAGE_IN_CHAT_LIST = 'ADD_MESSAGE_IN_CHAT_LIST';

export const addMessageInChatListAction = ({message, chatId}) => ({
    type: ADD_MESSAGE_IN_CHAT_LIST,
    payload: {
        message,
        chatId,
    },
});

export const REMOVE_MESSAGE_IN_CHAT_LIST = 'REMOVE_MESSAGE_IN_CHAT_LIST';

export const removeMessageInChatListAction = (chatId) => ({
    type: REMOVE_MESSAGE_IN_CHAT_LIST,
    payload: chatId,
});
