import { messagesRef } from '../../firebase/firebase';

export const CHANGE_MESSAGES_LIST = 'CHANGE_MESSAGES_LIST';

export const changeMessagesListAction = (payload) => ({
    type: CHANGE_MESSAGES_LIST,
    payload: payload,
});

export const DROP_MESSAGES_IN_STATE = 'DROP_MESSAGES_IN_STATE';

export const dropMessagesInStateAction = {
    type: DROP_MESSAGES_IN_STATE,
};

export const addMessageInChatListWithThunkAction = ({contactKey, contactName, contactId, text, imgSrc, author, messageUTCDateAndTime, messageId}) => () => {
    messagesRef.child(contactKey).update({
        [messageId]: '',
    });
    messagesRef.child(contactKey).child(messageId).child('contactKey').set(contactKey);
    messagesRef.child(contactKey).child(messageId).child('contactName').set(contactName);
    messagesRef.child(contactKey).child(messageId).child('contactId').set(contactId);
    messagesRef.child(contactKey).child(messageId).child('text').set(text);
    messagesRef.child(contactKey).child(messageId).child('imgSrc').set(imgSrc);
    messagesRef.child(contactKey).child(messageId).child('author').set(author);
    messagesRef.child(contactKey).child(messageId).child('messageUTCDateAndTime').set(messageUTCDateAndTime);
    messagesRef.child(contactKey).child(messageId).child('messageId').set(messageId);
};

export const deleteMessageInChatListWithThunkAction = (message) => {
    messagesRef.child(message.contactKey).child(message.messageId).remove();
};

const changeMessagesList = (dispatch, openChatKey) => {
    return (snapshot) => {
        dispatch(changeMessagesListAction({
            openChatKey: openChatKey, 
            snapshotVal: snapshot.val(),
        }));
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
