// import { chatsRef, deletedChatRef } from "../../firebase/firebase";
import { chatsRef } from "../../firebase/firebase";
// import { mapChatSnapshotToChat } from "../../helper/helper";

// export const ADD_IN_CHATS_LIST = 'ADD_IN_CHATS_LIST';

// export const addInChatsListAction = (chat) => ({
//     type: ADD_IN_CHATS_LIST,
//     payload: chat,
// });

// export const REMOVE_FROM_CHATS_LIST = 'REMOVE_FROM_CHATS_LIST';

// export const removeFromChatsListAction = (chatName) => ({
//     type: REMOVE_FROM_CHATS_LIST,
//     payload: chatName,
// });

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

// export const removeFromChatsListWithThunkAction = (chatKey, chatName) => (dispatch) => {
//     deletedChatRef.set({chatKey: chatKey, chatName: chatName});
//     chatsRef.child(chatKey).remove(() => {
//         dispatch(removeFromChatsListAction(chatName));
//     });
// };

export const removeFromChatsListWithThunkAction = (chatKey) => () => {
    chatsRef.child(chatKey).remove();
};

// export const onTrackingAddInChatsListWithThunkAction = (dispatch) => {
//     chatsRef.on('child_added', (snapshot) => {
//         dispatch(addInChatsListAction(mapChatSnapshotToChat(snapshot)));
//     });
// };

// export const offTrackingAddInChatsListWithThunkAction = () => {
//     chatsRef.off('child_added');
// };

// export const onTrackingRemoveFromChatsListWithThunkAction = (dispatch) => {
//     deletedChatRef.on('value', (snapshot) => {
//         const deletedChatName = snapshot.val().chatName;
//         dispatch(removeFromChatsListAction(deletedChatName));
//     });
// };

// export const offTrackingRemoveFromChatsListWithThunkAction = () => {
//     chatsRef.off('value');
// };

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
