import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getChatListChatKindOfListById } from '../../../store/ChatList/Selectors';
import { ListItem } from '@material-ui/core';
import { useStyles } from '../../../styles/Style';
import { ChatListUI } from '../../../ui_components/ChatListUI.jsx';
import { getChatsListChatsKindOfListSelector } from '../../../store/ChatsList/Selectors';
import { auth } from '../../../firebase/firebase';

export const ChatList = () => {
    const classes = useStyles();

    const { chatId } = useParams();

    const refOpenChat = useRef(null);

    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

    const [openContact] = chatsListRed.filter((item) => item.id === chatId);

    const chatListRed = useSelector(getChatListChatKindOfListById(openContact.key));

    const scrollDown = () => {
        const scrollHeight = Math.max(
            refOpenChat.current.scrollHeight,
            refOpenChat.current.offsetHeight,
            refOpenChat.current.clientHeight,
        );
    
        refOpenChat.current.scrollTo(0, scrollHeight);
    };

    useEffect(() => {
        scrollDown();
    }, [chatListRed]);

    if (chatListRed.length === 0) {
        return null
    }

    const myEmail = auth.currentUser.email;
    
    const chatListRedForProps = chatListRed.map((item, index) => (
        <ListItem className={`${classes.chatListItem} ${item.author === myEmail ? classes.chatListItemMe : classes.chatListItemSomebody}`} key={index}>
            <p className={classes.chatListItemMessageAuthor}>[{item.author}]:</p>
            <p className={classes.chatListItemMessageText}>{item.text}</p>
        </ListItem>
    ));

    return (
        <ChatListUI classes={classes} chatListRedForProps={chatListRedForProps} refOpenChat={refOpenChat}></ChatListUI>
    )
};
