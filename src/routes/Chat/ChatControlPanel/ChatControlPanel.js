import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../../../styles/Style';
import { getChatsListChatsKindOfListSelector } from '../../../store/ChatsList/Selectors';
import { isMobileDevice } from '../../../helper/helper';
import { ChatControlPanelUI } from '../../../ui_components/ChatControlPanelUI';
import { allAppComponentsWithPageTitle } from '../../../data/consts';
import { useHistory } from 'react-router-dom';
import { removeFromChatsListWithThunkAction } from '../../../store/ChatsList/Action';
import { removeMessageInChatListWithThunkAction } from '../../../store/ChatList/Action';
import { PopUpWindowUI } from '../../../ui_components/PopUpWindowUI';

export const ChatControlPanel = () => {
    const classes = useStyles();

    const [popUpWindowIsOpen, setPopUpWindowIsOpen] = useState(false);

    const isMobileDeviceBoolean = isMobileDevice();

    const {push} = useHistory();

    const { chatId } = useParams();

    const dispatch = useDispatch();

    const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

    const [openContact] = chatsListRed.filter((item) => item.id === chatId);

    const openPopUpWindow = () => {
        setPopUpWindowIsOpen(true);
    };

    const closePopUpWindow = () => {
        setPopUpWindowIsOpen(false);
    };

    const deleteChat = () => {
        dispatch(removeFromChatsListWithThunkAction(openContact.key, openContact.name));
        dispatch(removeMessageInChatListWithThunkAction(openContact.key));
        push(allAppComponentsWithPageTitle.messenger.path);
    };

    const closeChat = () => {
        push(allAppComponentsWithPageTitle.messenger.path);
    };

    useEffect(() => {
        setPopUpWindowIsOpen(false);
    }, [chatId]);

    return (
        <>
            <ChatControlPanelUI classes={classes} isMobileDeviceBoolean={isMobileDeviceBoolean} closeChat={closeChat} openPopUpWindow={openPopUpWindow} openContact={openContact}></ChatControlPanelUI>
            {popUpWindowIsOpen ? <PopUpWindowUI classes={classes} isMobileDeviceBoolean={isMobileDeviceBoolean} deleteChat={deleteChat} closePopUpWindow={closePopUpWindow} openContact={openContact}></PopUpWindowUI> : null}
        </>
    )
};
