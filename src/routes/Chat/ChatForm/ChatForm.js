import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageInChatListAction } from '../../../store/ChatList/Action';
import { Box, InputBase, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useStyles } from '../../../styles/Style';

export const ChartForm = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const refInput = useRef(null);

  const { chatId } = useParams();
  const chatsListRed = useSelector((state) => state.chatsListReducer);
  const [openContact] = chatsListRed.filter((item) => item.id === chatId);

  const chatListRed = useSelector((state) => state.chatListReducer.messages);
  console.log(chatListRed)

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
        const userMessage = {
          message: {author: openContact.name, text: value},
          chatId: openContact.id,
        };
        dispatch(addMessageInChatListAction(userMessage));
        scrollDown();
        resetValue();
    }
  };

const scrollDown = () => {
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight,
  );

  window.scrollTo(0, scrollHeight);
};

const botResponse = () => {
  const listLastElement = chatListRed[chatId][chatListRed[chatId].length - 1];
  console.log(listLastElement)
  if (listLastElement.author !== 'bot') {
    const botMessage = {
      message: {author: 'bot', text: `Ok, ${openContact.name}, принято!`},
      chatId: openContact.id,
      name: 'bot',
    };
    dispatch(addMessageInChatListAction(botMessage))
  };
};

useEffect(() => {
  scrollDown();
  console.log(Object.entries(chatListRed).length)
  if (Object.entries(chatListRed).length !== 0) {
    const timerId = setTimeout(() => {
      botResponse();
    }, 1500);

    return () => {clearTimeout(timerId)}
  };
}, [chatListRed]);

  const focusOnInput = () => {
    if (Object.entries(chatListRed).length === 0 || chatListRed[chatId][chatListRed[chatId].length - 1].author !== 'bot') {
      refInput.current.focus();
    }
  };

  useEffect((() => {
    focusOnInput();
  }),[chatListRed]); 

    return (
        <Box className={classes.form} component='form' onSubmit={onSubmit}>
          <InputBase className={classes.input} inputRef={refInput} placeholder="Сообщение" label="Сообщение" type="text" onChange={onSaveValueFromInput} value={value} />
          <IconButton type='submit'>
            <Send />
          </IconButton>
        </Box>
    )
};
