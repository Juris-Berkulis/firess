import React from 'react';
import { List } from '@material-ui/core';

export const ChatListUI = (props) => {
    return (
        <List className={props.classes.chatList}>{props.chatListRedForProps}</List>
    )
};
