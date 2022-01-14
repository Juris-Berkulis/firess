export const getBigChatRootSelector = (state) => state.bigChat;
export const getBigChatIsOpenSelector = (state) => getBigChatRootSelector(state).isBigChatOpen;
