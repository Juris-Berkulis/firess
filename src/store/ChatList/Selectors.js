export const getChatListRootSelector = (state) => state.chatListReducer;
export const getChatListMessagesSelector = (state) => getChatListRootSelector(state).messages;
