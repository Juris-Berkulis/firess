export const getChatListRootSelector = (state) => state.chatListReducer || {};
export const getChatListMessagesSelector = (state) => getChatListRootSelector(state).messages || {};
export const getChatListChatKindOfDictById = (chatId) => (state) => getChatListMessagesSelector(state)[chatId] || {};
export const getChatListChatKindOfListById = (chatId) => (state) => Object.values(getChatListChatKindOfDictById(chatId)(state));
