import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getChatListChatKindOfListById } from '../../../store/ChatList/Selectors';
import { ListItem } from '@material-ui/core';
import { useStyles } from '../../../styles/Style';
import { ChatListUI } from '../../../ui_components/ChatListUI.jsx';
import { getChatsListChatsKindOfListSelector } from '../../../store/ChatsList/Selectors';

export const ChatList = () => {
    const classes = useStyles();

    const { chatId } = useParams();

    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

    const [openContact] = chatsListRed.filter((item) => item.id === chatId);

    const chatListRed = useSelector(getChatListChatKindOfListById(openContact.key));
    console.log(chatListRed)

    if (chatListRed.length === 0) {
        return null
    }
    
    const chatListRedForProps = chatListRed.map((item, index) => <ListItem className={classes.chatListItem} key={index}>[{item.author}]: {item.text}</ListItem>);

    return (
        <ChatListUI classes={classes} chatListRedForProps={chatListRedForProps}></ChatListUI>
    )
};
