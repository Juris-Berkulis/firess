export const ADD_IN_CHATS_LIST = 'ADD_IN_CHATS_LIST';

export const addInChatsListAction = (payload) => ({
    type: ADD_IN_CHATS_LIST,
    payload
});

export const REMOVE_FROM_CHATS_LIST = 'REMOVE_FROM_CHATS_LIST';

export const removeFromChatsListAction = (payload) => ({
    type: REMOVE_FROM_CHATS_LIST,
    payload
});
