import { allAppComponentsWithPageTitle, appTitle, mobileScreenWidth } from "../data/consts";

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
});

export const getPageTitle = (location) => {
    for (let key in allAppComponentsWithPageTitle) {
        if (allAppComponentsWithPageTitle[key].path === location.pathname) {
        return allAppComponentsWithPageTitle[key].pageTitle
        } else {
            const objectRegExp = location.pathname.match(allAppComponentsWithPageTitle[key].pathCheck);

            if (objectRegExp !== null && objectRegExp.input === location.pathname) {
                return allAppComponentsWithPageTitle[key].pageTitle(location.pathname.split('/')[2])
            };
        };
    };
};

export const makeFullPageTitle = (pageTitle) => {
    return `${appTitle.name}${appTitle.delimiter}${pageTitle}`
};

export const giveTitleForPage = (title) => {
    return title ? (document.title = title) : (document.title = appTitle.name);
};

export const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;

    const screenDimensions = {width: width, height: height};
    return screenDimensions
};

export const isMobileDevice = () => {
    if (getWindowDimensions().width < mobileScreenWidth) {
        return true
    } else {
        return false
    };
};

export const screenHeightLessThan = (screenHeight) => {
    if (getWindowDimensions().height < screenHeight) {
        return true
    } else {
        return false
    };
};
