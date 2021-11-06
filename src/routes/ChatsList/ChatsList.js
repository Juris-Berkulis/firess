import React from 'react';
import { Link } from 'react-router-dom';
import { ChangeChatsList } from './ChangeChatsList/ChangeChatsList';
import { Box, List, ListItem } from '@material-ui/core';
import { useStyles } from '../../styles/Style';

export const ChatsList = (props) => {
    const classes = useStyles();

    return (
        <Box>
            <ChangeChatsList stateChatsList={props.stateChatsList} setStateChatsList={props.setStateChatsList}></ChangeChatsList>
            <List component="nav">
                {
                    props.stateChatsList.map((item) => <ListItem className={classes.allChatsListItem} button to={`/messenger/${item.id}`} component={Link} key={item.id}>{item.name}</ListItem>)
                }
            </List>
        </Box>
    )
};
