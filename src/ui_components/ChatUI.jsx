import React from 'react';
import { ChatList } from '../routes/Chat/ChatList/ChatList';
import { ChartForm } from '../routes/Chat/ChatForm/ChatForm';
import { Box } from '@material-ui/core';
import { ChatControlPanel } from '../routes/Chat/ChatControlPanel/ChatControlPanel';

export const ChatUI = (props) => {
    return (
        <Box className={`${props.classes.chat} ${props.isMobileDeviceBoolean ? props.classes.chatMobileDevice : null}`}>
            <div className={props.classes.chatUpPart}>
                <ChatControlPanel></ChatControlPanel>
            </div>
            <div className={props.classes.chatDownPart}>
                <ChatList></ChatList>
                <ChartForm></ChartForm>
            </div>
        </Box>
    )
};
