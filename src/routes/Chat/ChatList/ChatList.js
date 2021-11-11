import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getChatListMessagesSelector } from '../../../store/ChatList/Selectors';
import { List, ListItem } from '@material-ui/core';
import { useStyles } from '../../../styles/Style';

export const ChatList = (props) => {
    const classes = useStyles();

    const { chatId } = useParams();

    const chatListRed = useSelector(getChatListMessagesSelector);

    if (Object.entries(chatListRed).length === 0 || !chatListRed[chatId]) {
        return null
    }

    return (
        <List className={classes.chatList}>
            {
                chatListRed[chatId].map((item, index) => <ListItem className={classes.chatListItem} key={index}>{item.author}: {item.text}</ListItem>)
            }
        </List>
    )
};
