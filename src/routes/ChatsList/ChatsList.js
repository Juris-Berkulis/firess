import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChangeChatsList } from './ChangeChatsList/ChangeChatsList';
import { getChatsListRootSelector } from '../../store/ChatsList/Selectors';
import { Box, List, ListItem } from '@material-ui/core';
import { useStyles } from '../../styles/Style';

export const ChatsList = (props) => {
    const classes = useStyles();

    const chatsListRed = useSelector(getChatsListRootSelector);

    return (
        <Box>
            <ChangeChatsList></ChangeChatsList>
            <List component="nav">
                {
                    chatsListRed.map((item) => <ListItem className={classes.allChatsListItem} button to={`/messenger/${item.id}`} component={Link} key={item.id}>{item.name}</ListItem>)
                }
            </List>
        </Box>
    )
};
