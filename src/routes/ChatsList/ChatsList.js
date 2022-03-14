import React, { useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeChatsList } from './ChangeChatsList/ChangeChatsList';
import { getChatsListChatsKindOfListSelector } from '../../store/ChatsList/Selectors';
import { Box, ListItem } from '@material-ui/core';
import { useStyles } from '../../styles/Style';
import { ChatsListUI } from '../../ui_components/ChatsListUI.jsx';
import { offTrackingChangeValueInChatsListWithThunkAction, onTrackingChangeValueInChatsListWithThunkAction } from '../../store/ChatsList/Action';
import { getBigChatIsOpenSelector } from '../../store/BigChatStatus/Selectors';
import { isMobileDevice, isNumberOrString, sortingConditions } from '../../helper/helper';
import { bigChatClose } from '../../store/BigChatStatus/Action';
import { getStatusesInTheAppappThemeIsSelector, getStatusesInTheAppOnlySelectedChatsBooleanSelector, getStatusesInTheAppValueInChatsListInputIsSelector } from '../../store/AppSwitches/Selectors';
import { auth } from '../../firebase/firebase';
import { APP_THEMES_NAMES } from '../../data/consts';
import { chatsCount } from '../../store/AppSwitches/Action';

export const ChatsList = () => {
    const classes = useStyles();

    const isMobileDeviceBoolean = isMobileDevice();

    const dispatch = useDispatch();

    const myUID = auth.currentUser !== null ? auth.currentUser.uid : null;

    const rulesForSortingTheChatsList = (a, b) => {
        const chatNameA = isNumberOrString(a.name);
        const chatNameB = isNumberOrString(b.name);

        return sortingConditions(chatNameA, chatNameB)
    };

    const valueInChatsListInput = useSelector(getStatusesInTheAppValueInChatsListInputIsSelector);
    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector).sort(rulesForSortingTheChatsList);
    const appThemeSel = useSelector(getStatusesInTheAppappThemeIsSelector);
    const onlySelectedChatsSel = useSelector(getStatusesInTheAppOnlySelectedChatsBooleanSelector);

    const newChatsListRed = (
        onlySelectedChatsSel 
        ? 
        chatsListRed.filter(chat => (
            chat.theyLikeThisChat 
            && 
            chat.theyLikeThisChat[myUID]
        )) 
        : 
        chatsListRed
        ).filter(chat => chat.name.toLowerCase().includes(valueInChatsListInput.toLowerCase())).map((item) => {
        return (
            <ListItem className={`${classes.allChatsListItem} ${appThemeSel && appThemeSel.themeNameEn ? (appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_2.nameEn ? classes.allChatsListItem_darkTheme : appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_3.nameEn ? classes.allChatsListItem_greyTheme : appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_4.nameEn ? classes.allChatsListItem_sunnyTheme : null) : null}`} button to={`/messenger/${item.id}`} component={Link} key={item.id}>
                {
                    item.name
                }
                <p className={classes.allChatsListItem_wrapperSymbols}>
                    {
                        (
                            item.chatIsPrivate 
                            && 
                            item.chatIsPrivate === true
                        ) 
                        ? 
                        (
                            item.theyCanReadThisChat 
                            ? 
                            (
                                Object.values(item.theyCanReadThisChat).find((itemUID) => itemUID === myUID) 
                                ? 
                                <span className={classes.allChatsListItem_privatChatIcon}>&#128273;</span>
                                : 
                                <span className={classes.allChatsListItem_privatChatIcon}>&#128274;</span>
                            )
                            : 
                            null
                        ) 
                        : 
                        null
                    }
                    {
                        item.theyLikeThisChat && item.theyLikeThisChat[myUID] 
                        ? 
                        <span className={classes.allChatsListItem_favoriteIcon}>&#9733;</span>
                        : 
                        <span className={classes.allChatsListItem_favoriteIcon}>&#9734;</span>
                    }
                </p>
            </ListItem>
        )
    });

    useLayoutEffect(() => {
        dispatch(onTrackingChangeValueInChatsListWithThunkAction);

        return () => {
            dispatch(offTrackingChangeValueInChatsListWithThunkAction);
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch({
            type: bigChatClose.type,
        });
        return () => {
            dispatch({
                type: bigChatClose.type,
            });
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch({
            type: chatsCount.type,
            payload: newChatsListRed.length,
        });
    }, [dispatch, newChatsListRed.length]);

    const isBigChatOpen = useSelector(getBigChatIsOpenSelector);

    return (
        isBigChatOpen && isMobileDeviceBoolean 
        ? 
        null 
        : 
        <Box height='100%' width={isMobileDeviceBoolean ? '100%' : '19vw'} display={isBigChatOpen && isMobileDeviceBoolean ? 'none' : null}>
            <ChangeChatsList></ChangeChatsList>
            <ChatsListUI classes={classes} newChatsListRed={newChatsListRed}></ChatsListUI>
        </Box>
    )
};
