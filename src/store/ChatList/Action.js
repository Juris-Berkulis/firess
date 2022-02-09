// import { mapMessageSnapshotToMessage } from '../../helper/helper';
// import { BOT_NAME } from '../../data/consts';
// import { deletedChatRef, messagesRef } from '../../firebase/firebase';
import { messagesRef } from '../../firebase/firebase';

// export const ADD_MESSAGE_IN_CHAT_LIST = 'ADD_MESSAGE_IN_CHAT_LIST';

// export const addMessageInChatListAction = (message, chatId) => ({
//     type: ADD_MESSAGE_IN_CHAT_LIST,
//     payload: {
//         message,
//         chatId,
//     },
// });

// export const REMOVE_MESSAGE_IN_CHAT_LIST = 'REMOVE_MESSAGE_IN_CHAT_LIST';

// export const removeMessageInChatListAction = (chatId) => ({
//     type: REMOVE_MESSAGE_IN_CHAT_LIST,
//     payload: chatId,
// });

export const CHANGE_MESSAGES_LIST = 'CHANGE_MESSAGES_LIST';

export const changeMessagesListAction = (payload) => ({
    type: CHANGE_MESSAGES_LIST,
    payload: payload,
});

export const DROP_MESSAGES_IN_STATE = 'DROP_MESSAGES_IN_STATE';

export const dropMessagesInStateAction = {
    type: DROP_MESSAGES_IN_STATE,
};

// export const addMessageInChatListWithThunkAction = (author, text, chatId) => (dispatch) => {
//     const userMessage = sendMessage(author, text, chatId);
//     dispatch(addMessageInChatListAction(userMessage));
//     if (author !== BOT_NAME) {
//         const botMessage = sendMessage(BOT_NAME, `Ok, ${author}, принято!`, chatId);
//         dispatch(addMessageInChatListAction(botMessage));
//     }
// };

export const addMessageInChatListWithThunkAction = (contactKey, contactName, contactId, text, author, messageUTCDateAndTime) => () => {
    messagesRef.child(contactKey).push({contactKey, contactName, contactId, text, author, messageUTCDateAndTime});
};

// export const removeMessageInChatListWithThunkAction = (chatId) => (dispatch) => {
//     messagesRef.child(chatId).remove(() => {
//         dispatch(removeMessageInChatListAction(chatId));
//     });
// };

// export const onTrackingAddMessageInChatListWithThunkAction = (contactKey) => (dispatch) => {
//     messagesRef.child(contactKey).on('child_added', (snapshot) => {
//         dispatch(addMessageInChatListAction(mapMessageSnapshotToMessage(snapshot), contactKey));
//     });
// };

// export const offTrackingAddMessageInChatListWithThunkAction = (chatId) => () => {
//     messagesRef.child(chatId).off('child_added');
// };

// export const onTrackingRemoveMessageInChatListWithThunkAction = () => (dispatch) => {
//     deletedChatRef.on('value', (snapshot) => {
//         const deletedChatKey = snapshot.val().ChatKey;
//         dispatch(removeMessageInChatListAction(deletedChatKey));
//     });
// };

// export const offTrackingRemoveMessageInChatListWithThunkAction = (chatId) => () => {
//     messagesRef.child(chatId).off('value');
// };

const changeMessagesList = (dispatch, openChatKey) => {
    return (snapshot) => {
        dispatch(changeMessagesListAction({
            openChatKey: openChatKey, 
            snapshotVal: snapshot.val(),
        }));
        // console.log('555')
    }
};

export const onTrackingChangeValueInMessagesListFromOpenChatWithThunkAction = (openChatKey) => (dispatch) => {
    messagesRef.child(openChatKey).on('value', changeMessagesList(dispatch, openChatKey));
};

export const offTrackingChangeValueInMessagesListFromOpenChatWithThunkAction = (openChatKey) => (dispatch) => {
    messagesRef.child(openChatKey).off('value', changeMessagesList(dispatch, openChatKey));
};

export const removeAllMessagesInDeleteChatWithThunkAction = (openChatKey) => (dispatch) => {
    messagesRef.child(openChatKey).remove();
    dispatch({
        type: dropMessagesInStateAction.type,
    });
};
