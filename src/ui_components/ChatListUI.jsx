import React from 'react';
import { List } from '@material-ui/core';

export const ChatListUI = (props) => {
    return (
        <List className={props.classes.chatList} ref={props.refOpenChat}>{props.chatListRedForProps}</List>
    )
};
