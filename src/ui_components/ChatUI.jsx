import React from 'react';
import { ChatList } from '../routes/Chat/ChatList/ChatList';
import { ChartForm } from '../routes/Chat/ChatForm/ChatForm';
import { Box } from '@material-ui/core';

export const ChatUI = (props) => {
    return (
        <Box className={props.classes.chat}>
            <ChatList></ChatList>
            <ChartForm></ChartForm>
        </Box>
    )
};
