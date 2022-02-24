import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChatsListChatsKindOfDictSelector, getChatsListChatsKindOfListSelector } from '../../store/ChatsList/Selectors';
import { useStyles } from '../../styles/Style';
import { ChatUI } from '../../ui_components/ChatUI.jsx';
import { allAppComponentsWithPageTitle, APP_THEMES_NAMES } from '../../data/consts';
import { bigChatClose, bigChatOpen } from '../../store/BigChatStatus/Action';
import { getKeyForTheChatByChatId, isMobileDevice } from '../../helper/helper';
import { aquariumStatus } from '../../store/AppSwitches/Action';
import { auth } from '../../firebase/firebase';
import { getStatusesInTheAppappThemeIsSelector } from '../../store/AppSwitches/Selectors';

export const Chat = () => {
    const classes = useStyles();

    const isMobileDeviceBoolean = isMobileDevice();

    const { chatId } = useParams();

    const dispatch = useDispatch();

    const appThemeSel = useSelector(getStatusesInTheAppappThemeIsSelector);

    const chatsListChatsKindOfDictRed = useSelector(getChatsListChatsKindOfDictSelector);
    const openChatKey = getKeyForTheChatByChatId(chatsListChatsKindOfDictRed, chatId);
    const openContact = chatsListChatsKindOfDictRed[openChatKey];
    const privateChat = (openContact && openContact.chatIsPrivate === true) ? true : false;
    const myUID = auth.currentUser !== null ? auth.currentUser.uid : null;
    const canIReadThisChatBoolean = openContact && (!openContact.theyCanReadThisChat || (openContact.chatAuthor && openContact.chatAuthor === myUID) || (openContact.theyCanReadThisChat && Object.values(openContact.theyCanReadThisChat).find((usersUID) => usersUID === myUID))) ? true : false;

    useEffect(() => {
        dispatch({
            type: aquariumStatus.type,
            payload: false,
        });

        dispatch({
            type: bigChatOpen.type,
        });
        return () => {
            dispatch({
                type: bigChatClose.type,
            });
        };
    }, [dispatch]);

    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

    if (!(chatsListRed.find((item) => String(item.id) === chatId))) {
        return (
            <Redirect to={allAppComponentsWithPageTitle.error404.path}></Redirect>
        )
    };

    return (
        <ChatUI classes={classes} isMobileDeviceBoolean={isMobileDeviceBoolean} privateChat={privateChat} canIReadThisChatBoolean={canIReadThisChatBoolean} appThemeSel={appThemeSel} APP_THEMES_NAMES={APP_THEMES_NAMES}></ChatUI>
    )
};
