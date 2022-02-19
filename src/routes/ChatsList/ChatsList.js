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
import { getStatusesInTheAppValueInChatsListInputIsSelector } from '../../store/AppSwitches/Selectors';

export const ChatsList = () => {
    const classes = useStyles();

    const isMobileDeviceBoolean = isMobileDevice();

    const dispatch = useDispatch();

    const rulesForSortingTheChatsList = (a, b) => {
        const chatNameA = isNumberOrString(a.name);
        const chatNameB = isNumberOrString(b.name);

        return sortingConditions(chatNameA, chatNameB)
    };

    const valueInChatsListInput = useSelector(getStatusesInTheAppValueInChatsListInputIsSelector);
    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector).sort(rulesForSortingTheChatsList);

    const newChatsListRed = chatsListRed.filter(chat => chat.name.toLowerCase().includes(valueInChatsListInput.toLowerCase())).map((item) => <ListItem className={classes.allChatsListItem} button to={`/messenger/${item.id}`} component={Link} key={item.id}>{item.name}{(item.chatPassword && item.chatPassword !== '') ? <p className={classes.allChatsListItem_wrapperSymbols}><span>&#128274;</span></p> : null}</ListItem>);

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
