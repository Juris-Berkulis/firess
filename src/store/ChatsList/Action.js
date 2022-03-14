import { chatAccessRef, chatsRef } from "../../firebase/firebase";

export const CHANGE_CHATS_LIST = 'CHANGE_CHATS_LIST';

export const changeChatsListAction = (snapshotVal) => ({
    type: CHANGE_CHATS_LIST,
    payload: snapshotVal,
});

export const DROP_CHATS_LIST_IN_STATE = 'DROP_CHATS_LIST_IN_STATE';

export const dropChatsListInStateAction = {
    type: DROP_CHATS_LIST_IN_STATE,
};

export const addInChatsListWithThunkAction = (chat) => () => {
    chatsRef.push(chat);
};

export const removeFromChatsListWithThunkAction = (chatKey) => () => {
    chatsRef.child(chatKey).remove();
};

const changeChatsList = (dispatch) => {
    return (snapshot) => {
        dispatch(changeChatsListAction(snapshot.val()));
    }
};

export const onTrackingChangeValueInChatsListWithThunkAction = (dispatch) => {
    chatsRef.on('value', changeChatsList(dispatch));
};

export const offTrackingChangeValueInChatsListWithThunkAction = (dispatch) => {
    chatsRef.off('value', changeChatsList(dispatch));
};

export const changeChatPasswordWithThunkAction = (chatKey, chatId, password, chatAuthorUID) => () => {
    chatsRef.child(chatKey).child('theyCanReadThisChat').set('');
    chatsRef.child(chatKey).child('theyCanReadThisChat').push(chatAuthorUID);
    chatAccessRef.update({
        [chatId]: '',
    });
    chatAccessRef.child(chatId).child('chatPassword').set(password);
    chatAccessRef.child(chatId).child('theyCanReadThisChat').set('');
    chatAccessRef.child(chatId).child('theyCanReadThisChat').push(chatAuthorUID);
};

export const addUserIntoChatWithThunkAction = (chatKey, chatId, userUID) => () => {
    chatsRef.child(chatKey).child('theyCanReadThisChat').push(userUID);
    chatAccessRef.child(chatId).child('theyCanReadThisChat').push(userUID);
};

export const deleteSecretIntoAboutDeletedChatWithThunkAction = (chatId) => () => {
    if (chatAccessRef.child(chatId)) {
        chatAccessRef.child(chatId).remove();
    }
};

export const makeTheChatPublicWithThunkAction = (chatKey) => () => {
    chatsRef.child(chatKey).update({
        chatIsPrivate: false,
    });
};

export const makeTheChatPrivateWithThunkAction = (chatKey) => () => {
    chatsRef.child(chatKey).update({
        chatIsPrivate: true,
    });
};

export const addTheUserWhoLikesThisChatWithThunkAction = (chatKey, userUID) => () => {
    chatsRef.child(chatKey).child('theyLikeThisChat').update({
        [userUID]: userUID,
    });
};

export const deleteTheUserWhoDoesNotLikeThisChatWithThunkAction = (chatKey, userUID) => () => {
    chatsRef.child(chatKey).child('theyLikeThisChat').child(userUID).remove();
};
