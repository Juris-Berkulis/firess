import { allAppComponentsWithPageTitle, appTitle, mobileScreenWidth } from "../data/consts";
import { auth } from "../firebase/firebase";
import { functionsForMocks } from "./forMocks/functions";

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

// export const userVerificationWaiting = (setLoad, push) => {
//     const timerId = setInterval(async () => {
//         if (auth.currentUser) {
//             await functionsForMocks.userReload();
//             if (auth.currentUser && auth.currentUser.emailVerified) {
//                 push(allAppComponentsWithPageTitle.profile.path);
//                 setLoad(false);
//                 return clearInterval(timerId)
//             }
//         } else {
//             setLoad(false);
//             return clearInterval(timerId)
//         }
//     }, 5000);
// };

// export const instantUserVerificationChecking = async (setLoad, push) => {
//     if (auth.currentUser) {
//         setLoad(false);
//         await functionsForMocks.userReload();
//         if (auth.currentUser && auth.currentUser.emailVerified) {
//             push(allAppComponentsWithPageTitle.profile.path);
//         } else if (auth.currentUser && !auth.currentUser.emailVerified) {
//             setLoad(true);
//             userVerificationWaiting(setLoad, push);
//         }
//     }
// };

// export const confirmSendingOfTheVerificationLetter = (myEmail) => {
//     return `Письмо отправлено на "${myEmail}"!`
// };

export const userVerificationWaiting = (verificationWaitingBoolean, push) => {
    const timerId = setInterval(async () => {
        if (auth.currentUser) {
            await functionsForMocks.userReload();

            if (auth.currentUser && auth.currentUser.emailVerified) {
                push(allAppComponentsWithPageTitle.profile.path);
                // setLoad(false);
                verificationWaitingBoolean = false;

                return {waiting: verificationWaitingBoolean, clear: clearInterval(timerId)}
            }
        } else {
            // setLoad(false);
            verificationWaitingBoolean = false;

            return {waiting: verificationWaitingBoolean, clear: clearInterval(timerId)}
        }
    }, 5000);
};

export const instantUserVerificationChecking = async (verificationWaitingBoolean, push) => {
    if (auth.currentUser) {
        // setLoad(false);
        verificationWaitingBoolean = false;
        await functionsForMocks.userReload();
        if (auth.currentUser && auth.currentUser.emailVerified) {
            push(allAppComponentsWithPageTitle.profile.path);

            return verificationWaitingBoolean
        } else if (auth.currentUser && !auth.currentUser.emailVerified) {
            // setLoad(true);
            verificationWaitingBoolean = true;
            const isLoading = userVerificationWaiting(verificationWaitingBoolean, push);
            const waiting = (isLoading && isLoading.waiting ? isLoading.waiting : null);
            if (isLoading && isLoading.clear) {
                isLoading.clear();
            }

            if (waiting === false) {
                verificationWaitingBoolean = false;
            }

            return verificationWaitingBoolean
        }
    }
};
