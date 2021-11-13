import React from 'react';
import { List } from '@material-ui/core';

export const ChatsListUI = (props) => {
    return (
        <List component="nav">{props.newChatsListRed}</List>
    )
};
