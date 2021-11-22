import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeChatsList } from './ChangeChatsList/ChangeChatsList';
import { getChatsListChatsKindOfListSelector, getChatsListRootSelector } from '../../store/ChatsList/Selectors';
import { Box, ListItem } from '@material-ui/core';
import { useStyles } from '../../styles/Style';
import { ChatsListUI } from '../../ui_components/ChatsListUI.jsx';
import { offTrackingAddInChatsListWithThunkAction, offTrackingRemoveFromChatsListWithThunkAction, onTrackingAddInChatsListWithThunkAction, onTrackingRemoveFromChatsListWithThunkAction } from '../../store/ChatsList/Action';

export const ChatsList = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);
    console.log(chatsListRed)

    const newChatsListRed = chatsListRed.map((item) => <ListItem className={classes.allChatsListItem} button to={`/messenger/${item.id}`} component={Link} key={item.id}>{item.name}</ListItem>);

    useEffect(() => {
        dispatch(onTrackingAddInChatsListWithThunkAction);
        dispatch(onTrackingRemoveFromChatsListWithThunkAction);

        return () => {
            dispatch(offTrackingAddInChatsListWithThunkAction);
            dispatch(offTrackingRemoveFromChatsListWithThunkAction);
        }
    }, []);

    return (
        <Box>
            <ChangeChatsList></ChangeChatsList>
            <ChatsListUI newChatsListRed={newChatsListRed}></ChatsListUI>
        </Box>
    )
};
