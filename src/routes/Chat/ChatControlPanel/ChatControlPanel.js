import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../../../styles/Style';
import { getChatsListChatsKindOfDictSelector } from '../../../store/ChatsList/Selectors';
import { getKeyForTheChatByChatId, isMobileDevice } from '../../../helper/helper';
import { ChatControlPanelUI } from '../../../ui_components/ChatControlPanelUI';
import { allAppComponentsWithPageTitle } from '../../../data/consts';
import { useHistory } from 'react-router-dom';
import { changeChatPasswordWithThunkAction, removeFromChatsListWithThunkAction } from '../../../store/ChatsList/Action';
import { removeAllMessagesInDeleteChatWithThunkAction } from '../../../store/ChatList/Action';
import { PopUpWindowUI } from '../../../ui_components/PopUpWindowUI';
import { auth } from '../../../firebase/firebase';
import { PopUpWindowForChangeChatPasswordUI } from '../../../ui_components/PopUpWindowForChangeChatPasswordUI';

export const ChatControlPanel = () => {
    const classes = useStyles();

    const [popUpWindowIsOpen, setPopUpWindowIsOpen] = useState(false);
    const [popUpWindowForChangeChatPasswordIsOpen, setPopUpWindowForChangeChatPasswordIsOpen] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');

    const isMobileDeviceBoolean = isMobileDevice();

    const {push} = useHistory();

    const { chatId } = useParams();

    const dispatch = useDispatch();
    
    const refInput = useRef(null);
    
    const chatsListChatsKindOfDictRed = useSelector(getChatsListChatsKindOfDictSelector);
    const openChatKey = getKeyForTheChatByChatId(chatsListChatsKindOfDictRed, chatId);
    const openContact = chatsListChatsKindOfDictRed[openChatKey];
    const myUID = auth.currentUser !== null ? auth.currentUser.uid : null;
    const chatPassword = (openContact && openContact.chatAuthor === myUID) ? openContact.chatPassword : null;

    const openPopUpWindow = () => {
        setPopUpWindowIsOpen(true);
    };

    const closePopUpWindow = () => {
        setPopUpWindowIsOpen(false);
    };

    const openPopUpWindowForChangeChatPassword = () => {
        setPopUpWindowForChangeChatPasswordIsOpen(true);
    };

    const closePopUpWindowForChangeChatPassword = () => {
        setPopUpWindowForChangeChatPasswordIsOpen(false);
    };

    const deleteChat = () => {
        dispatch(removeFromChatsListWithThunkAction(openChatKey));
        dispatch(removeAllMessagesInDeleteChatWithThunkAction(openChatKey));
        push(allAppComponentsWithPageTitle.messenger.path);
    };

    const closeChat = () => {
        push(allAppComponentsWithPageTitle.messenger.path);
    };

    const onSavePasswordValueFromInput = (event) => {
        setPasswordValue(event.target.value);
    };

    const changeChatPassword = () => {
        dispatch(changeChatPasswordWithThunkAction(openChatKey, passwordValue, myUID));
        closePopUpWindowForChangeChatPassword();
    };

    useEffect(() => {
        setPopUpWindowIsOpen(false);
        setPopUpWindowForChangeChatPasswordIsOpen(false);
        setPasswordValue('');
    }, [chatId]);

    return (
        <>
            <ChatControlPanelUI classes={classes} isMobileDeviceBoolean={isMobileDeviceBoolean} closeChat={closeChat} openPopUpWindow={openPopUpWindow} openContact={openContact} myUID={myUID} openPopUpWindowForChangeChatPassword={openPopUpWindowForChangeChatPassword}></ChatControlPanelUI>
            {popUpWindowIsOpen ? <PopUpWindowUI classes={classes} isMobileDeviceBoolean={isMobileDeviceBoolean} deleteChat={deleteChat} closePopUpWindow={closePopUpWindow} openContact={openContact}></PopUpWindowUI> : null}
            {popUpWindowForChangeChatPasswordIsOpen ? <PopUpWindowForChangeChatPasswordUI classes={classes} isMobileDeviceBoolean={isMobileDeviceBoolean} closePopUpWindowForChangeChatPassword={closePopUpWindowForChangeChatPassword} openContact={openContact} refInput={refInput} onSavePasswordValueFromInput={onSavePasswordValueFromInput} changeChatPassword={changeChatPassword} chatPassword={chatPassword}></PopUpWindowForChangeChatPasswordUI> : null}
        </>
    )
};
