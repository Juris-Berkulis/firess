import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { List, ListItem } from '@material-ui/core';
import { useStyles } from '../../../styles/Style';

export const ChatList = (props) => {
    const classes = useStyles();

    const { chatId } = useParams();

    const chatsListRed = useSelector((state) => state.chatsListReducer);
    // const [openContact] = chatsListRed.filter((item) => item.id === chatId);

    const chatListRed = useSelector((state) => state.chatListReducer.messages);

    if (Object.keys(chatListRed).length === 0 || !chatListRed[chatId]) {
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
