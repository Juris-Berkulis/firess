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
      dispatch(addMessageInChatListWithThunkAction(openContact.key, openContact.name, openContact.id, value, author));
      scrollDown();
      resetValue();
    }
  };

  const scrollDown = () => {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight,
    );

    window.scrollTo(0, scrollHeight);
  };

  const focusOnInput = () => {
    refInput.current.focus();
  };

  useEffect(() => {
    focusOnInput();
  }, [chatListRed]); 

  useEffect(() => {
    scrollDown();
  }, [chatListRed]);

  useEffect(() => {
    dispatch(onTrackingAddMessageInChatListWithThunkAction(openContact.key));

    return () => {
      dispatch(offTrackingAddMessageInChatListWithThunkAction(openContact.key));
    }
  }, [chatId]);

  return (
    <ChartFormUI classes={classes} onSubmit={onSubmit} refInput={refInput} onSaveValueFromInput={onSaveValueFromInput} value={value}></ChartFormUI>
  )
};
