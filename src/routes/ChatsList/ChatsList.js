import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeChatsList } from './ChangeChatsList/ChangeChatsList';
import { getChatsListChatsKindOfListSelector } from '../../store/ChatsList/Selectors';
import { Box, ListItem } from '@material-ui/core';
import { useStyles } from '../../styles/Style';
import { ChatsListUI } from '../../ui_components/ChatsListUI.jsx';
import { offTrackingAddInChatsListWithThunkAction, offTrackingRemoveFromChatsListWithThunkAction, onTrackingAddInChatsListWithThunkAction, onTrackingRemoveFromChatsListWithThunkAction } from '../../store/ChatsList/Action';
import { offTrackingRemoveMessageInChatListWithThunkAction, onTrackingRemoveMessageInChatListWithThunkAction } from '../../store/ChatList/Action';
import { useMakePageTitle } from '../../hooks/hooks';

export const ChatsList = (props) => {
    const classes = useStyles();
    useMakePageTitle('Fireact Messenger. Мессенджер');

    const dispatch = useDispatch();

    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

    const newChatsListRed = chatsListRed.map((item) => <ListItem className={classes.allChatsListItem} button to={`/messenger/${item.id}`} component={Link} key={item.id}>{item.name}</ListItem>);

    useEffect(() => {
        dispatch(onTrackingAddInChatsListWithThunkAction);
        dispatch(onTrackingRemoveFromChatsListWithThunkAction);
        dispatch(onTrackingRemoveMessageInChatListWithThunkAction);

        return () => {
            dispatch(offTrackingAddInChatsListWithThunkAction);
            dispatch(offTrackingRemoveFromChatsListWithThunkAction);
            dispatch(offTrackingRemoveMessageInChatListWithThunkAction);
        }
    }, []);

    return (
        <Box>
            <ChangeChatsList></ChangeChatsList>
            <ChatsListUI newChatsListRed={newChatsListRed}></ChatsListUI>
        </Box>
    )
};
