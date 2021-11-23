export const sendMessage = (author, text, chatId) => {
    const somebodyMessage = {
        message: {author: author, text: text},
        chatId: chatId,
    };
    return somebodyMessage
};

export const mapChatSnapshotToChat = (snapshot) => ({
    ...snapshot.val(),
    key: snapshot.key,
});

export const mapMessageSnapshotToMessage = (snapshot) => ({
    ...snapshot.val(),
    messageKey: snapshot.key,
})
