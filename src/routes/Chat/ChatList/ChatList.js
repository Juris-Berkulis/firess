import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getChatListMessagesSelector } from '../../../store/ChatList/Selectors';
import { ListItem } from '@material-ui/core';
import { useStyles } from '../../../styles/Style';
import { ChatListUI } from '../../../ui_components/ChatListUI.jsx';

export const ChatList = () => {
    const classes = useStyles();

    const { chatId } = useParams();

    const chatListRed = useSelector(getChatListMessagesSelector);

    if (Object.entries(chatListRed).length === 0 || !chatListRed[chatId]) {
        return null
    }

    const chatListRedForProps = chatListRed[chatId].map((item, index) => <ListItem className={classes.chatListItem} key={index}>{item.author}: {item.text}</ListItem>);

    return (
        // <List className={classes.chatList}>
        //     {
        //         chatListRed[chatId].map((item, index) => <ListItem className={classes.chatListItem} key={index}>{item.author}: {item.text}</ListItem>)
        //     }
        // </List>
        <ChatListUI classes={classes} chatListRedForProps={chatListRedForProps}></ChatListUI>
    )
};
