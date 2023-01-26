import { allAppComponentsWithPageTitle, appTitle, mobileScreenWidth } from "../data/consts";
import { auth } from "../firebase/firebase";
import { countdownForLetterRequest } from "../store/AppSwitches/Action";
import { functionsForMocks } from "./forMocks/functions";

export const sendMessage = (author, text, chatId) => {
    const somebodyMessage = {
        message: {author: author, text: text},
        chatId: chatId,
    };
    return somebodyMessage
};

//* This feature is no longer used, but not removed just in case:
export const mapChatSnapshotToChat = (snapshot) => ({
    ...snapshot.val(),
    key: snapshot.key,
});

//* This feature is no longer used, but not removed just in case:
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

export const userVerificationWaiting = (verificationWaitingBoolean, push) => {
    const timerId = setInterval(async () => {
        if (auth.currentUser) {
            await functionsForMocks.userReload();

            if (auth.currentUser && auth.currentUser.emailVerified) {
                push(allAppComponentsWithPageTitle.profile.path);
                verificationWaitingBoolean = false;

                return {waiting: verificationWaitingBoolean, clear: clearInterval(timerId)}
            }
        } else {
            verificationWaitingBoolean = false;

            return {waiting: verificationWaitingBoolean, clear: clearInterval(timerId)}
        }
    }, 5000);
};

export const instantUserVerificationChecking = async (verificationWaitingBoolean, push) => {
    if (auth.currentUser) {
        verificationWaitingBoolean = false;
        await functionsForMocks.userReload();
        if (auth.currentUser && auth.currentUser.emailVerified) {
            push(allAppComponentsWithPageTitle.profile.path);

            return verificationWaitingBoolean
        } else if (auth.currentUser && !auth.currentUser.emailVerified) {
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

export const confirmSendingOfTheVerificationLetter = (myEmail) => {
    return {
        success: `Письмо отправлено${myEmail ? (' на ' + myEmail) : null}. Перейдите по ссылке в письме, чтобы завершить процесс регистрации.`, 
        error: `Выполните вход!`,
    }
};

export const requestTheLetter = async (myEmail) => {
    if (auth.currentUser) {
        await functionsForMocks.checkEmail();
        const infoMessage = confirmSendingOfTheVerificationLetter(myEmail).success;

        return infoMessage
    } else if (!auth.currentUser) {
        const error = confirmSendingOfTheVerificationLetter(myEmail).error;

        return error
    }
};

export const countdownForLetterRequestWithLink = (dispatch, startValueForTimer) => {
    let counter = startValueForTimer;

    const intervalId = setInterval(() => {
        dispatch({
            type: countdownForLetterRequest.type,
            payload: counter,
        });
        if (counter <= 0) {
            dispatch({
                type: countdownForLetterRequest.type,
                payload: 0,
            });

            return clearTimeout(intervalId)
        }
        counter--;
    }, 1000);
};

export const allowedPeriodInsideTheApp = (
    years, 
    weeks, 
    days, 
    hours, 
    minutes, 
    seconds, 
    milliseconds
) => {
    const period = (
        milliseconds 
        + seconds * 1000 
        + minutes * 60 * 1000 
        + hours * 60 * 60 * 1000 
        + days * 24 * 60 * 60 * 1000 
        + weeks * 7 * 24 * 60 * 60 * 1000 
        + years * 365 * 24 * 60 * 60 * 1000
    );

    return period
};

export const isValidNumber = (valueStr) => {
    if (valueStr[0] === '+') {
        return false
    } else if (valueStr[0] === '0' && valueStr[1] && valueStr[1] !== '.') {
        return false
    } else if (valueStr[0] === '-' && valueStr[1] && valueStr[1] === '0' && (!valueStr[2] || (valueStr[2] && valueStr[2] !== '.'))) {
        return false
    }
    return true
};

export const isNumberOrString = (value) => {
    const validNumber = isValidNumber(String(value));

    const item = (
        (
                value === '0' 
                || 
                value === 0 
                || 
                (
                    +value 
                    && 
                    validNumber
                ) 
        ) 
        ? 
        +value 
        : 
        value.toLowerCase()
    );

    return item
};

export const sortingConditions = (num1, num2) => {
    if (num1 === num2) {
        return 0
    } else if (typeof(num1) === 'number' && typeof(num2) === 'string') {
        return -1
    } else if (typeof(num2) === 'number' && typeof(num1) === 'string') {
        return 1
    } else {
        if (num1 < num2) {
            return -1
        } else if (num1 > num2) {
            return 1
        } else {
            return 0
        };
    };
};

export const getElementWidth = (ref) => {
    if (ref.current) {
        const refWidth = ref.current.clientWidth;
        return refWidth
    }
    return null
};

export const getElementHeight = (ref) => {
    if (ref.current) {
        const refHeight = ref.current.clientHeight;
        return refHeight
    }
    return null
};

const getKeyForTheChat = (chatsListChatsKindOfDictRed, findValue, keyInValueOfDict) => {
    for (let key in chatsListChatsKindOfDictRed) {
        if (chatsListChatsKindOfDictRed[key][keyInValueOfDict] === findValue) {
            return key
        }
    }
    return null
};

export const getKeyForTheChatByChatName = (chatsListChatsKindOfDictRed, findValue) => {
    const key = getKeyForTheChat(chatsListChatsKindOfDictRed, findValue, 'name');
    return key
};

export const getKeyForTheChatByChatId = (chatsListChatsKindOfDictRed, findValue) => {
    const key = getKeyForTheChat(chatsListChatsKindOfDictRed, findValue, 'id');
    return key
};

export const destroyAllTags = (inputText) => {
    const newInputText = inputText
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')

    return newInputText
};

export const createTagsToHighlightTheEnteredText = (inputText, classes) => {
    const newInputText = inputText
        .replaceAll('*,,', '<strong>')
        .replaceAll(',,*', '</strong>')
        .replaceAll('/,,', '<em>')
        .replaceAll(',,/', '</em>')
        .replaceAll('_,,', '<ins>')
        .replaceAll(',,_', '</ins>')
        .replaceAll('-,,', '<s>')
        .replaceAll(',,-', '</s>')
        .replaceAll('+,,', '<mark style="background-color: #cccccc;">')
        .replaceAll(',,+', '</mark>')
        .replaceAll('=,,', '<br>')
        .replaceAll(',,=', '')
        .replaceAll('(,,', `<p style="margin: 1vh 0;">`)
        .replaceAll(',,)', '</p>');

    return newInputText
};

export const autoEditInputText = (inputText, classes) => {
    const textWithoutForbiddenTags = destroyAllTags(inputText);
    const textWithHighlightTags = createTagsToHighlightTheEnteredText(textWithoutForbiddenTags, classes);

    return textWithHighlightTags
};
