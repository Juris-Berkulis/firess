export const getChatsListRootSelector = (state) => state.chatsListReducer;
export const getChatsListChatsKindOfDictSelector = (state) => getChatsListRootSelector(state).chats || {};
export const getChatsListChatsKindOfListSelector = (state) => Object.values(getChatsListChatsKindOfDictSelector(state));
