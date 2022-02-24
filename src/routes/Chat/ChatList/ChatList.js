import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChatListChatKindOfListById } from '../../../store/ChatList/Selectors';
import { ListItem } from '@material-ui/core';
import { useStyles } from '../../../styles/Style';
import { ChatListUI } from '../../../ui_components/ChatListUI.jsx';
import { getChatsListChatsKindOfDictSelector } from '../../../store/ChatsList/Selectors';
import { auth } from '../../../firebase/firebase';
import { getKeyForTheChatByChatId, isMobileDevice } from '../../../helper/helper';
import { dropMessagesInStateAction, offTrackingChangeValueInMessagesListFromOpenChatWithThunkAction, onTrackingChangeValueInMessagesListFromOpenChatWithThunkAction } from '../../../store/ChatList/Action';

export const ChatList = () => {
    const classes = useStyles();

    const isMobileDeviceBoolean = isMobileDevice();

    const { chatId } = useParams();

    const refOpenChat = useRef(null);

    const dispatch = useDispatch();

    const chatsListChatsKindOfDictRed = useSelector(getChatsListChatsKindOfDictSelector);
    const openChatKey = getKeyForTheChatByChatId(chatsListChatsKindOfDictRed, chatId);

    const chatListRed = useSelector(getChatListChatKindOfListById(openChatKey));

    const scrollDown = () => {
        if (refOpenChat.current) {
            const scrollHeight = Math.max(
                refOpenChat.current.scrollHeight,
                refOpenChat.current.offsetHeight,
                refOpenChat.current.clientHeight,
            );
        
            refOpenChat.current.scrollTo(0, scrollHeight);
        }
    };

    useEffect(() => {
        scrollDown();
    }, [chatListRed]);

    useLayoutEffect(() => {
        dispatch(onTrackingChangeValueInMessagesListFromOpenChatWithThunkAction(openChatKey));

        return () => {
            dispatch({
                type: dropMessagesInStateAction.type,
            });
            dispatch(offTrackingChangeValueInMessagesListFromOpenChatWithThunkAction(openChatKey));
        }
    }, [dispatch, openChatKey]);

    if (chatListRed.length === 0) {
        return null
    }

    const myEmail = (auth.currentUser !== null ? auth.currentUser.email : null);

    const localTimezone = new Date().getTimezoneOffset() / -60;

    const getMonth = (monthString) => {
        if (monthString === 'Jan') {
            return 0
        } else if (monthString === 'Feb') {
            return 1
        } else if (monthString === 'Mar') {
            return 2
        } else if (monthString === 'Apr') {
            return 3
        } else if (monthString === 'May') {
            return 4
        } else if (monthString === 'Jun') {
            return 5
        } else if (monthString === 'Jul') {
            return 6
        } else if (monthString === 'Aug') {
            return 7
        } else if (monthString === 'Sep') {
            return 8
        } else if (monthString === 'Oct') {
            return 9
        } else if (monthString === 'Nov') {
            return 10
        } else if (monthString === 'Dec') {
            return 11
        } else {
            return '??'
        };
    };

    const parseUTCDataAndTimeString = (utcDateAndTime) => {
        const utcDateAndTimeList = utcDateAndTime.split(' ');
        const localYear = +utcDateAndTimeList[3];
        const localMonth = getMonth(utcDateAndTimeList[2]);
        const localNumber = +utcDateAndTimeList[1];
        const localHour = +utcDateAndTimeList[4].split(':')[0] + localTimezone;
        const localMinute = +utcDateAndTimeList[4].split(':')[1];
        const localSecond = +utcDateAndTimeList[4].split(':')[2];

        return {
            localYear, 
            localMonth, 
            localNumber, 
            localHour, 
            localMinute, 
            localSecond
        }
    };

    const getValidLocalDateAndTime = (
        localYear, 
        localMonth, 
        localNumber, 
        localHour, 
        localMinute, 
        localSecond
        ) => {//* - Example: "Mon Dec 27 2021 18:14:41 GMT+0300 (Москва, стандартное время)".
        const localDateAndTime = new Date(localYear, localMonth, localNumber, localHour, localMinute, localSecond).toString();
        return localDateAndTime
    };

    const parseLocalDataAndTimeString = (validDateAndTime) => {
        const validDateAndTimeList = validDateAndTime.split(' ');
        const validLocalYear = +validDateAndTimeList[3];
        const validLocalMonth = validDateAndTimeList[1];
        const validLocalNumber = +validDateAndTimeList[2];
        const validLocalHour = +validDateAndTimeList[4].split(':')[0];
        const validLocalMinute = validDateAndTimeList[4].split(':')[1];
        const validLocalSecond = validDateAndTimeList[4].split(':')[2];

        return {
            validLocalNumber, 
            validLocalMonth, 
            validLocalYear, 
            validLocalHour, 
            validLocalMinute, 
            validLocalSecond
        }
    };

    const getLocalDateAndTime = (utcDateAndTime) => { //* - Example: "Mon, 27 Dec 2021 15:14:41 GMT".
        const {
            localYear, 
            localMonth, 
            localNumber, 
            localHour, 
            localMinute, 
            localSecond
        } = parseUTCDataAndTimeString(utcDateAndTime);

        const validDateAndTime = getValidLocalDateAndTime(localYear, localMonth, localNumber, localHour, localMinute, localSecond);

        const {
            validLocalNumber, 
            validLocalMonth, 
            validLocalYear, 
            validLocalHour, 
            validLocalMinute, 
            validLocalSecond
        } = parseLocalDataAndTimeString(validDateAndTime);

        return `${validLocalNumber} ${validLocalMonth} ${validLocalYear} в ${validLocalHour}:${validLocalMinute}:${validLocalSecond}`
    };
    
    const convertStringLinksToWorkingLinks = (text) => {
        const regExp = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i;
        let newText;
        const listWithStringLinks = text.match(regExp);
        if (listWithStringLinks !== null) {
            newText = text.split(' ').map((e) => (regExp.test(e) ? `<a href=${e} target="_blank">${e}</a>` : e)).join(' ')
        } else {
            newText = text;
        }

        return newText
    };
    
    const chatListRedForProps = chatListRed.map((item, index) => (
        <ListItem className={`${classes.chatListItem} ${item.author === myEmail ? classes.chatListItemMe : classes.chatListItemSomebody}`} key={index}>
            <div className={`${classes.chatListItemMessage} ${item.author === myEmail ? classes.chatListItemMessageMe : classes.chatListItemMessageSomebody}`}>
                <p className={`${classes.chatListItemMessageAuthor} ${isMobileDeviceBoolean ? classes.chatListItemMessageAuthorMobileDevice : null}`}>[{item.author}]:</p>
                <p className={`${classes.chatListItemMessageText} ${isMobileDeviceBoolean ? classes.chatListItemMessageTextMobileDevice : null}`} dangerouslySetInnerHTML={{__html: convertStringLinksToWorkingLinks(item.text)}}></p>
                <p className={`${classes.chatListItemMessageDateAndTime} ${isMobileDeviceBoolean ? classes.chatListItemMessageDateAndTimeMobileDevice : null}`}>{item.messageUTCDateAndTime ? getLocalDateAndTime(item.messageUTCDateAndTime) : 'Нет данных'}</p>
            </div>
        </ListItem>
    ));

    return (
        <ChatListUI classes={classes} chatListRedForProps={chatListRedForProps} refOpenChat={refOpenChat}></ChatListUI>
    )
};
