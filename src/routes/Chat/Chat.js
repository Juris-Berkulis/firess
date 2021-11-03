import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { ChatList } from './ChatList/ChatList';
import { ChartForm } from './ChatForm/ChatForm';
import { Box } from '@material-ui/core';
import { useStyles } from '../../styles/Style';

export const Chat = (props) => {
    const classes = useStyles();

    const { chatId } = useParams();

    if (!(props.stateChatsList.find((item) => String(item.id) === chatId))) {
        return (
            <Redirect to='/messenger/error404'></Redirect>
        )
    };

    return (
        <Box className={classes.chat}>
            <ChatList messageList={props.messageList}></ChatList>
            <ChartForm sendMessage={props.sendMessage} nextKey={props.nextKey} messageList={props.messageList}></ChartForm>
        </Box>
    )
};
