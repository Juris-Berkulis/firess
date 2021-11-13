import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getChatsListRootSelector } from '../../store/ChatsList/Selectors';
import { useStyles } from '../../styles/Style';
import { ChatUI } from '../../ui_components/ChatUI.jsx';

export const Chat = () => {
    const classes = useStyles();

    const { chatId } = useParams();

    const chatsListRed = useSelector(getChatsListRootSelector);

    if (!(chatsListRed.find((item) => String(item.id) === chatId))) {
        return (
            <Redirect to='/messenger/error404'></Redirect>
        )
    };

    return (
        // <Box className={classes.chat}>
        //     <ChatList messageList={props.messageList}></ChatList>
        //     <ChartForm sendMessage={props.sendMessage} nextKey={props.nextKey} messageList={props.messageList}></ChartForm>
        // </Box>
        <ChatUI classes={classes}></ChatUI>
    )
};
