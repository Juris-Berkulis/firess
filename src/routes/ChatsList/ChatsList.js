import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChangeChatsList } from './ChangeChatsList/ChangeChatsList';
import { getChatsListRootSelector } from '../../store/ChatsList/Selectors';
import { Box, ListItem } from '@material-ui/core';
import { useStyles } from '../../styles/Style';
import { ChatsListUI } from '../../ui_components/ChatsListUI.jsx';

export const ChatsList = (props) => {
    const classes = useStyles();

    const chatsListRed = useSelector(getChatsListRootSelector);

    const newChatsListRed = chatsListRed.map((item) => <ListItem className={classes.allChatsListItem} button to={`/messenger/${item.id}`} component={Link} key={item.id}>{item.name}</ListItem>);

    return (
        <Box>
            <ChangeChatsList></ChangeChatsList>
            <ChatsListUI newChatsListRed={newChatsListRed}></ChatsListUI>
        </Box>
    )
};
