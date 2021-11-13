import { sendMessage } from '../../helper/helper';
import { BOT_NAME } from '../../data/consts';

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

export const addMessageInChatListWithThunkAction = (author, text, chatId) => (dispatch) => {
    const userMessage = sendMessage(author, text, chatId);
    dispatch(addMessageInChatListAction(userMessage));
    if (author !== BOT_NAME) {
        const botMessage = sendMessage(BOT_NAME, `Ok, ${author}, принято!`, chatId);
        dispatch(addMessageInChatListAction(botMessage));
    }
};
