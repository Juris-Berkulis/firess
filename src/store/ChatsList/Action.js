import { chatsRef } from "../../firebase/firebase";

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
