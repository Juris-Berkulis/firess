import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { useStyles } from '../../../styles/Style';

export const ChatList = (props) => {
    const classes = useStyles();

    return (
        <List className={classes.chatList}>
            {
                props.messageList.map((item) => <ListItem className={classes.chatListItem} key={item.id}>{item.author}: {item.text}</ListItem>)
            }
        </List>
    )
};
