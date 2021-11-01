import React from 'react';
import { CHAT_LIST as chatList } from '../../data/chat list';
import { List, ListItem } from '@material-ui/core';
import { useStyles } from '../../styles/Style';

export const ChatsList = () => {
    const classes = useStyles();

    return (
        <List component="nav">
            {
            chatList.map((item) => <ListItem className={classes.allChatsListItem} button key={item.id}>{item.name}</ListItem>)
            }
        </List>
    )
};
