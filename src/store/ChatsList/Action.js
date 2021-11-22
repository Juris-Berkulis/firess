import { chatsRef, deletedChatNameRef } from "../../firebase/firebase";
import { mapChatSnapshotToChat } from "../../helper/helper";

export const ADD_IN_CHATS_LIST = 'ADD_IN_CHATS_LIST';

export const addInChatsListAction = (chat) => ({
    type: ADD_IN_CHATS_LIST,
    payload: chat,
});

export const REMOVE_FROM_CHATS_LIST = 'REMOVE_FROM_CHATS_LIST';

export const removeFromChatsListAction = (chatName) => ({
    type: REMOVE_FROM_CHATS_LIST,
    payload: chatName,
});

export const addInChatsListWithThunkAction = (chat) => () => {
    chatsRef.push(chat);
};

export const removeFromChatsListWithThunkAction = (chatKey, chatName) => (dispatch) => {
    deletedChatNameRef.set(chatName);
    chatsRef.child(chatKey).remove(() => {
        dispatch(removeFromChatsListAction(chatName));
    });
};

export const onTrackingAddInChatsListWithThunkAction = (dispatch) => {
    chatsRef.on('child_added', (snapshot) => {
        dispatch(addInChatsListAction(mapChatSnapshotToChat(snapshot)));
        console.log(snapshot)
    });
};

export const offTrackingAddInChatsListWithThunkAction = () => {
    chatsRef.off('child_added');
};

export const onTrackingRemoveFromChatsListWithThunkAction = (dispatch) => {
    deletedChatNameRef.on('value', (snapshot) => {
        const deletedChatName = snapshot.val();
        dispatch(removeFromChatsListAction(deletedChatName));
        console.log(deletedChatName)
    });
};

export const offTrackingRemoveFromChatsListWithThunkAction = () => {
    chatsRef.off('child_removed');
};
