import React from 'react';
import { ChatList } from './ChatList/ChatList';
import { ChartForm } from './ChatForm/ChatForm';
import { Box } from '@material-ui/core';
import { useStyles } from '../../styles/Style';

export const Chat = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.chat}>
            <ChatList messageList={props.messageList}></ChatList>
            <ChartForm sendMessage={props.sendMessage} nextKey={props.nextKey} messageList={props.messageList}></ChartForm>
        </Box>
    )
};
