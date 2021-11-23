import { mapMessageSnapshotToMessage } from '../../helper/helper';
// import { BOT_NAME } from '../../data/consts';
import { deletedChatKeyRef, messagesRef } from '../../firebase/firebase';

export const ADD_MESSAGE_IN_CHAT_LIST = 'ADD_MESSAGE_IN_CHAT_LIST';

export const addMessageInChatListAction = (message, chatId) => ({
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

// export const addMessageInChatListWithThunkAction = (author, text, chatId) => (dispatch) => {
//     const userMessage = sendMessage(author, text, chatId);
//     dispatch(addMessageInChatListAction(userMessage));
//     if (author !== BOT_NAME) {
//         const botMessage = sendMessage(BOT_NAME, `Ok, ${author}, принято!`, chatId);
//         dispatch(addMessageInChatListAction(botMessage));
//     }
// };

export const addMessageInChatListWithThunkAction = (contactKey, contactName, contactId, text, author) => () => {
    messagesRef.child(contactKey).push({contactKey, contactName, contactId, text, author});
};

export const removeMessageInChatListWithThunkAction = (chatId) => (dispatch) => {
    messagesRef.child(chatId).remove(() => {
        dispatch(removeMessageInChatListAction(chatId));
    });
};

export const onTrackingAddMessageInChatListWithThunkAction = (contactKey) => (dispatch) => {
    messagesRef.child(contactKey).on('child_added', (snapshot) => {
        console.log('ffffffffff')
        dispatch(addMessageInChatListAction(mapMessageSnapshotToMessage(snapshot), contactKey));
    });
};

export const offTrackingAddMessageInChatListWithThunkAction = (chatId) => () => {
    messagesRef.child(chatId).off('child_added');
};

export const onTrackingRemoveMessageInChatListWithThunkAction = () => (dispatch) => {
    deletedChatKeyRef.on('value', (snapshot) => {
        const deletedChatKey = snapshot.val();
        dispatch(removeMessageInChatListAction(deletedChatKey));
        console.log(deletedChatKey)
    });
};

export const offTrackingRemoveMessageInChatListWithThunkAction = (chatId) => () => {
    messagesRef.child(chatId).off('value');
};
