import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChatsListChatsKindOfListSelector } from '../../store/ChatsList/Selectors';
import { useStyles } from '../../styles/Style';
import { ChatUI } from '../../ui_components/ChatUI.jsx';
import { allAppComponentsWithPageTitle } from '../../data/consts';
import { bigChatClose, bigChatOpen } from '../../store/BigChatStatus/Action';
import { isMobileDevice } from '../../helper/helper';

export const Chat = () => {
    const classes = useStyles();

    const isMobileDeviceBoolean = isMobileDevice();

    const { chatId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: bigChatOpen.type,
        });
        return () => {
            dispatch({
                type: bigChatClose.type,
            });
        };
    }, [dispatch]);

    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

    if (!(chatsListRed.find((item) => String(item.id) === chatId))) {
        return (
            <Redirect to={allAppComponentsWithPageTitle.error404.path}></Redirect>
        )
    };

    return (
        <ChatUI classes={classes} isMobileDeviceBoolean={isMobileDeviceBoolean}></ChatUI>
    )
};
