import React from 'react';
import { List } from '@material-ui/core';

export const ChatsListUI = (props) => {
    return (
        <List className={props.classes.chatsList} component="nav">{props.newChatsListRed}</List>
    )
};
