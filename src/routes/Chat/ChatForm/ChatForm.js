import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageInChatListWithThunkAction, offTrackingAddMessageInChatListWithThunkAction, onTrackingAddMessageInChatListWithThunkAction } from '../../../store/ChatList/Action';
import { getChatsListChatsKindOfListSelector } from '../../../store/ChatsList/Selectors';
import { getChatListMessagesSelector } from '../../../store/ChatList/Selectors';
import { useStyles } from '../../../styles/Style';
import { ChartFormUI } from '../../../ui_components/ChatFormUI.jsx';
import { auth } from '../../../firebase/firebase';

export const ChartForm = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const refInput = useRef(null);

  const { chatId } = useParams();
  const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);
  const [openContact] = chatsListRed.filter((item) => item.id === chatId);

  const chatListRed = useSelector(getChatListMessagesSelector);

  const author = auth.currentUser.email;

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
      dispatch(addMessageInChatListWithThunkAction(openContact.key, openContact.name, openContact.id, value, author, messageUTCDateAndTime));
      resetValue();
    }
  };

  const focusOnInput = () => {
    refInput.current.focus();
  };

  useEffect(() => {
    focusOnInput();
  }, [chatListRed]); 

  useEffect(() => {
    dispatch(onTrackingAddMessageInChatListWithThunkAction(openContact.key));

    return () => {
      dispatch(offTrackingAddMessageInChatListWithThunkAction(openContact.key));
    }
  }, [openContact.key, dispatch]);

  return (
    <ChartFormUI classes={classes} onSubmit={onSubmit} refInput={refInput} onSaveValueFromInput={onSaveValueFromInput} value={value}></ChartFormUI>
  )
};
