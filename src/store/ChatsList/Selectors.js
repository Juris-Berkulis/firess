export const getChatsListRootSelector = (state) => state.chatsListReducer;
export const getChatsListChatsKindOfDictSelector = (state) => getChatsListRootSelector(state).chats || {};
// export const getChatsListChatsKindOfListWithKeysSelector = (state) => Object.keys(getChatsListChatsKindOfDictSelector(state));
export const getChatsListChatsKindOfListSelector = (state) => Object.values(getChatsListChatsKindOfDictSelector(state));
// export const getChatsListChatsKindOfListWithKeysAndValuesSelector = (state) => Object.entries(getChatsListChatsKindOfDictSelector(state));
export const getChatFromChatsListById = (chatId) => (state) => getChatsListChatsKindOfDictSelector(state)[chatId];
export const hasChatFromChatsListById = (chatId) => (state) => chatId in getChatsListChatsKindOfDictSelector(state);
// export const getChatsListDeletedChatNameSelector = (state) => getChatsListRootSelector(state).deletedChatName;
