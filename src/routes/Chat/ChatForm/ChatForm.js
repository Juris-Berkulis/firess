import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageInChatListWithThunkAction } from '../../../store/ChatList/Action';
import { getChatsListChatsKindOfDictSelector } from '../../../store/ChatsList/Selectors';
import { getChatListMessagesSelector } from '../../../store/ChatList/Selectors';
import { useStyles } from '../../../styles/Style';
import { ChartFormUI } from '../../../ui_components/ChatFormUI.jsx';
import { auth } from '../../../firebase/firebase';
import { autoEditInputText, getKeyForTheChatByChatId } from '../../../helper/helper';

export const ChartForm = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const refInput = useRef(null);

  const { chatId } = useParams();

  const chatsListChatsKindOfDictRed = useSelector(getChatsListChatsKindOfDictSelector);
  const openChatKey = getKeyForTheChatByChatId(chatsListChatsKindOfDictRed, chatId);
  const openContact = chatsListChatsKindOfDictRed[openChatKey];

  const chatListMessagesRed = useSelector(getChatListMessagesSelector);

  const author = (auth.currentUser !== null ? auth.currentUser.email : null);

  const dispatch = useDispatch();

  const onSaveValueFromInput = (event) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue('');
  };

  const onSubmit = (event) => {
    event.preventDefault(); //* Cancel page reload.
    if (value !== '') {
      const now = new Date();
      const messageUTCDateAndTime = now.toUTCString();
      const newMessage = autoEditInputText(value, classes);
      dispatch(addMessageInChatListWithThunkAction(openChatKey, openContact.name, openContact.id, newMessage, author, messageUTCDateAndTime));
      resetValue();
    }
  };

  const focusOnInput = () => {
    refInput.current.focus();
  };

  useEffect(() => {
    focusOnInput();
  }, [chatListMessagesRed]); 

  return (
    <ChartFormUI classes={classes} onSubmit={onSubmit} refInput={refInput} onSaveValueFromInput={onSaveValueFromInput} value={value}></ChartFormUI>
  )
};
