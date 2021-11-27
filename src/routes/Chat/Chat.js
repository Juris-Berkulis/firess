import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getChatsListChatsKindOfListSelector } from '../../store/ChatsList/Selectors';
import { useStyles } from '../../styles/Style';
import { ChatUI } from '../../ui_components/ChatUI.jsx';
import { useMakePageTitle } from '../../hooks/hooks';

export const Chat = () => {
    const classes = useStyles();

    const { chatId } = useParams();

    useMakePageTitle(`Fireact Messenger. Чат: ${chatId}`);

    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

    if (!(chatsListRed.find((item) => String(item.id) === chatId))) {
        return (
            <Redirect to='/messenger/error404'></Redirect>
        )
    };

    return (
        <ChatUI classes={classes}></ChatUI>
    )
};
