import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { auth } from '../../../firebase/firebase';
import { getKeyForTheChatByChatId, isMobileDevice } from '../../../helper/helper';
import { addUserIntoChatWithThunkAction } from '../../../store/ChatsList/Action';
import { getChatsListChatsKindOfDictSelector } from '../../../store/ChatsList/Selectors';
import { useStyles } from '../../../styles/Style';
import { YouAreDeniedAccessToTheChatUI } from '../../../ui_components/YouAreDeniedAccessToTheChatUI';

export const YouAreDeniedAccessToTheChat = () => {
    const classes = useStyles();

    const [passwordValue, setPasswordValue] = useState('');
    const [error, setError] = useState(false);

    const { chatId } = useParams();

    const refInput = useRef(null);

    const dispatch = useDispatch();

    const isMobileDeviceBoolean = isMobileDevice();
    
    const chatsListChatsKindOfDictRed = useSelector(getChatsListChatsKindOfDictSelector);
    const openChatKey = getKeyForTheChatByChatId(chatsListChatsKindOfDictRed, chatId);
    const openContact = chatsListChatsKindOfDictRed[openChatKey];
    const chatPassword = openContact.chatPassword;
    const myUID = auth.currentUser !== null ? auth.currentUser.uid : null;

    const resetPasswordInInput = () => {
        setError(false);
        setPasswordValue('');
    };

    const onSavePasswordValueFromInput = (event) => {
        setError(false);
        setPasswordValue(event.target.value);
    };

    const registerToChat = () => {
        if (passwordValue === chatPassword) {
            dispatch(addUserIntoChatWithThunkAction(openChatKey, myUID));
        } else {
            setError('Неверный пароль');
        }
    };

    useEffect(() => {
        setPasswordValue('');
    }, [chatId]);

    return (
        <YouAreDeniedAccessToTheChatUI classes={classes} onSavePasswordValueFromInput={onSavePasswordValueFromInput} refInput={refInput} passwordValue={passwordValue} registerToChat={registerToChat} error={error} resetPasswordInInput={resetPasswordInInput} isMobileDeviceBoolean={isMobileDeviceBoolean}></YouAreDeniedAccessToTheChatUI>
    )
};
