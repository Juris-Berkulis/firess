import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChatList } from './ChatList/ChatList';
import { ChartForm } from './ChatForm/ChatForm';
import { getChatsListRootSelector } from '../../store/ChatsList/Selectors';
import { Box } from '@material-ui/core';
import { useStyles } from '../../styles/Style';

export const Chat = (props) => {
    const classes = useStyles();

    const { chatId } = useParams();

    const chatsListRed = useSelector(getChatsListRootSelector);

    if (!(chatsListRed.find((item) => String(item.id) === chatId))) {
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
